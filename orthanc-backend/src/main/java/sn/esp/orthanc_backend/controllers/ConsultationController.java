package sn.esp.orthanc_backend.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import sn.esp.orthanc_backend.repositories.ConsultationRepository;
import sn.esp.orthanc_backend.repositories.DossierMedicalRepository;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("*")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private DossierMedicalRepository dossierRepository;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> ajouterConsultation(@RequestBody Consultation c) {
        Long dossierId = c.getDossier().getId();
        Optional<DossierMedical> dossier = dossierRepository.findById(dossierId);

        if (dossier.isEmpty()) {
            return ResponseEntity.badRequest().body("Dossier médical non trouvé");
        }

        c.setDossier(dossier.get());
        c.setDateConsultation(LocalDate.now());
        return ResponseEntity.ok(consultationRepository.save(c));
    }

    @GetMapping("/dossier/{dossierId}")
    public List<Consultation> getByDossier(@PathVariable Long dossierId) {
        return consultationRepository.findByDossierId(dossierId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConsultationById(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
