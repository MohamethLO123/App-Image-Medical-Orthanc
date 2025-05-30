package sn.esp.orthanc_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.esp.orthanc_backend.entities.Role;
import sn.esp.orthanc_backend.repositories.RoleRepository;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createRole(@RequestBody Role role) {
        if (roleRepository.existsByNom(role.getNom())) {
            return ResponseEntity.badRequest().body("Ce rôle existe déjà.");
        }
        Role saved = roleRepository.save(role);
        return ResponseEntity.ok(saved);
    }
}

