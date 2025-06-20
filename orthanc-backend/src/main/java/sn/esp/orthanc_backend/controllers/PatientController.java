package sn.esp.orthanc_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sn.esp.orthanc_backend.entities.Patient;
import sn.esp.orthanc_backend.repositories.PatientRepository;
import sn.esp.orthanc_backend.service.OrthancService;
import sn.esp.orthanc_backend.service.PatientService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private OrthancService orthancService;

    @Autowired
    PatientRepository patientRepository;

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.save(patient);
    }

    // Liste tous les patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    // Crée un patient depuis les données DICOM d'une étude
    @PostMapping("/from-study/{studyId}")
    public Patient importFromStudy(@PathVariable String studyId) {
        Map<String, Object> study = orthancService.getStudyDetails(studyId);
        Map<String, Object> patientTags = (Map<String, Object>) study.get("PatientMainDicomTags");
        return patientService.createOrUpdateFromDicomTag(patientTags);
    }
}
