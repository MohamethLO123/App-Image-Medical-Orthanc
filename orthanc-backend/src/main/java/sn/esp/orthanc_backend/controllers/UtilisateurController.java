package sn.esp.orthanc_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sn.esp.orthanc_backend.entities.Utilisateur;
import sn.esp.orthanc_backend.entities.Role;
import sn.esp.orthanc_backend.entities.Hopital;
import sn.esp.orthanc_backend.repositories.UtilisateurRepository;
import sn.esp.orthanc_backend.repositories.RoleRepository;
import sn.esp.orthanc_backend.repositories.HopitalRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private HopitalRepository hopitalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            return ResponseEntity.badRequest().body("Cet e-mail est déjà utilisé.");
        }

        // Vérification de l'hôpital
        Optional<Hopital> hopital = hopitalRepository.findById(utilisateur.getHopital().getId());
        if (hopital.isEmpty()) {
            return ResponseEntity.badRequest().body("Hôpital introuvable.");
        }

        // Vérification et chargement des rôles
        Set<Role> roles = new HashSet<>();
        for (Role r : utilisateur.getRoles()) {
            Optional<Role> role = roleRepository.findById(r.getId());
            role.ifPresent(roles::add);
        }

        // Enregistrement
        utilisateur.setHopital(hopital.get());
        utilisateur.setRoles(roles);
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        Utilisateur savedUser = utilisateurRepository.save(utilisateur);

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUtilisateurById(@PathVariable Long id) {
        return utilisateurRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur updatedUser) {
        Optional<Utilisateur> existingUserOpt = utilisateurRepository.findById(id);

        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Utilisateur existingUser = existingUserOpt.get();

        // Mettre à jour les champs simples
        existingUser.setNom(updatedUser.getNom());
        existingUser.setPrenom(updatedUser.getPrenom());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setTelephone(updatedUser.getTelephone());

        // Mettre à jour l’hôpital
        Optional<Hopital> hopital = hopitalRepository.findById(updatedUser.getHopital().getId());
        if (hopital.isEmpty()) {
            return ResponseEntity.badRequest().body("Hôpital introuvable.");
        }
        existingUser.setHopital(hopital.get());

        // Mettre à jour les rôles
        Set<Role> roles = new HashSet<>();
        for (Role r : updatedUser.getRoles()) {
            Optional<Role> role = roleRepository.findById(r.getId());
            role.ifPresent(roles::add);
        }
        existingUser.setRoles(roles);

        // Ne change pas le mot de passe si non fourni
        if (updatedUser.getMotDePasse() != null && !updatedUser.getMotDePasse().isBlank()) {
            existingUser.setMotDePasse(passwordEncoder.encode(updatedUser.getMotDePasse()));
        }

        Utilisateur saved = utilisateurRepository.save(existingUser);
        return ResponseEntity.ok(saved);
    }


}
