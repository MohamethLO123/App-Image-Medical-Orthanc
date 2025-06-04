package sn.esp.orthanc_backend.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.esp.orthanc_backend.entities.Patient;
import sn.esp.orthanc_backend.repositories.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient createOrUpdateFromDicomTag(Map<String, Object> dicomTags) {
        String patientId = (String) dicomTags.get("PatientID");
        String patientName = (String) dicomTags.get("PatientName"); 
        String sexe = (String) dicomTags.get("PatientSex");
        String birthDate = (String) dicomTags.get("PatientBirthDate");

        String[] parts = patientName != null ? patientName.split("\\^") : new String[] {"INCONNU", ""};
        String nom = parts[0];
        String prenom = parts.length > 1 ? parts[1] : "";

        LocalDate dateNaissance = (birthDate != null && !birthDate.isEmpty())
            ? LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("yyyyMMdd"))
            : null;

        return patientRepository.findByPatientId(patientId)
            .map(p -> {
                p.setNom(nom); p.setPrenom(prenom); p.setDateNaissance(dateNaissance); p.setSexe(sexe);
                return patientRepository.save(p);
            })
            .orElseGet(() -> patientRepository.save(new Patient(null, patientId, nom, prenom, sexe, dateNaissance, null, null, null)));
    }

    public Optional<Patient> findByPatientId(String patientId) {
        return patientRepository.findByPatientId(patientId);
    }

    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    public String generatePatientId() {
        long count = patientRepository.count() + 1;
        return String.format("P%05d", count); // Ex : P00001
    }


    public Patient save(Patient patient) {
        if (patient.getPatientId() == null || patient.getPatientId().isEmpty()) {
            String generatedId = generatePatientId();
            patient.setPatientId(generatedId);
        }
        return patientRepository.save(patient);
    }

}
