package sn.esp.orthanc_backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.esp.orthanc_backend.entities.DossierMedical;

@Repository
public interface DossierMedicalRepository extends JpaRepository<DossierMedical, Long> {
    List<DossierMedical> findByPatientId(Long patientId);
    Optional<DossierMedical> findByPatientIdAndHopitalId(Long patientId, Long hopitalId);
}


