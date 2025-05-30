package sn.esp.orthanc_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.esp.orthanc_backend.entities.Hopital;

@Repository
public interface HopitalRepository extends JpaRepository<Hopital, Long> {
    Optional<Hopital> findByNom(String nom);
    boolean existsByNom(String nom);
}

