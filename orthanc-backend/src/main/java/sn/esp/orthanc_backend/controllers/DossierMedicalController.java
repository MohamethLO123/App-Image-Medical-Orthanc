package sn.esp.orthanc_backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.esp.orthanc_backend.entities.DossierMedical;
import sn.esp.orthanc_backend.entities.Hopital;
import sn.esp.orthanc_backend.entities.Utilisateur;
import sn.esp.orthanc_backend.repositories.DossierMedicalRepository;
import sn.esp.orthanc_backend.repositories.UtilisateurRepository;

@RestController
@RequestMapping("/api/dossiers")
@CrossOrigin("*")
public class DossierMedicalController {

    @Autowired
    private DossierMedicalRepository dossierRepo;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping("/patient/{patientId}")
    public List<DossierMedical> getDossiersByPatient(@PathVariable Long patientId) {
        return dossierRepo.findByPatientId(patientId);
    }

    @PostMapping
    public ResponseEntity<?> createDossier(@RequestBody DossierMedical dossier, Authentication authentication) {
        // 1. Récupérer l'utilisateur connecté via son email
        String email = authentication.getName(); // JWT payload contient l'email
        Optional<Utilisateur> optionalUser = utilisateurRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non authentifié");
        }

        Utilisateur utilisateurConnecte = optionalUser.get();

        // 2. Récupérer l'hôpital de l'utilisateur connecté
        Hopital hopitalUtilisateur = utilisateurConnecte.getHopital();

        if (hopitalUtilisateur == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aucun hôpital associé à l'utilisateur connecté");
        }

        // 3. Vérifier unicité patient + hôpital
        Long patientId = dossier.getPatient().getId();
        Long hopitalId = hopitalUtilisateur.getId();

        Optional<DossierMedical> existing = dossierRepo.findByPatientIdAndHopitalId(patientId, hopitalId);
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Un dossier existe déjà pour ce patient et cet hôpital.");
        }

        // 4. Injecter l’hôpital automatiquement
        dossier.setHopital(hopitalUtilisateur);

        // 5. Sauvegarder le dossier
        return ResponseEntity.ok(dossierRepo.save(dossier));
    }

}
