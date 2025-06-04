package sn.esp.orthanc_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "dossier_medical", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "patient_id", "hopital_id" })
})
public class DossierMedical {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String motif;
    private String dateConsultation;
    private String observation;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "hopital_id")
    private Hopital hopital;
}

