package sn.esp.orthanc_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.esp.orthanc_backend.entities.Hopital;
import sn.esp.orthanc_backend.repositories.HopitalRepository;

@RestController
@RequestMapping("/api/hopitaux")
public class HopitalController {

    @Autowired
    private HopitalRepository hopitalRepository;

    @GetMapping
    public ResponseEntity<List<Hopital>> getAllHopitaux() {
        return ResponseEntity.ok(hopitalRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createHopital(@RequestBody Hopital hopital) {
        if (hopitalRepository.existsByNom(hopital.getNom())) {
            return ResponseEntity.badRequest().body("Ce nom d'hôpital est déjà utilisé.");
        }
        Hopital saved = hopitalRepository.save(hopital);
        return ResponseEntity.ok(saved);
    }
}
