package sn.esp.orthanc_backend.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String motif;
    private String diagnostic;
    private String traitement;
    private String note;
    private LocalDate dateConsultation;

    @ManyToOne
    @JoinColumn(name = "dossier_id")
    private DossierMedical dossier;

}

