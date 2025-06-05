package sn.esp.orthanc_backend.controllers;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.esp.orthanc_backend.entities.Consultation;
import sn.esp.orthanc_backend.entities.DossierMedical;
import sn.esp.orthanc_backend.entities.Hopital;
import sn.esp.orthanc_backend.entities.Utilisateur;
import sn.esp.orthanc_backend.repositories.ConsultationRepository;
import sn.esp.orthanc_backend.repositories.DossierMedicalRepository;
import sn.esp.orthanc_backend.repositories.UtilisateurRepository;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("*")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private DossierMedicalRepository dossierRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> ajouterConsultation(@RequestBody Consultation c, Principal principal) {
        // Récupérer le dossier
        Long dossierId = c.getDossier().getId();
        Optional<DossierMedical> dossierOpt = dossierRepository.findById(dossierId);

        if (dossierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Dossier médical non trouvé");
        }

        // Récupérer le médecin connecté via email (JWT)
        String email = principal.getName();
        Optional<Utilisateur> medecinOpt = utilisateurRepository.findByEmail(email);
        if (medecinOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Médecin introuvable");
        }

        Utilisateur medecin = medecinOpt.get();
        Hopital hopital = medecin.getHopital();

        // Compléter les infos de la consultation
        c.setDossier(dossierOpt.get());
        c.setDateConsultation(LocalDate.now());
        c.setMedecin(medecin);
        c.setHopital(hopital);

        Consultation saved = consultationRepository.save(c);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/dossier/{dossierId}")
    public List<Consultation> getByDossier(@PathVariable Long dossierId) {
        return consultationRepository.findByDossierId(dossierId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConsultationById(@PathVariable Long id) {
        Optional<Consultation> consultationOpt = consultationRepository.findById(id);

        if (consultationOpt.isPresent()) {
            Consultation consultation = consultationOpt.get();
            return ResponseEntity.ok(consultation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
