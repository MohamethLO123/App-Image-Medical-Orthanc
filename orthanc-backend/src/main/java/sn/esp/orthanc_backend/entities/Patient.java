package sn.esp.orthanc_backend.entities;

import jakarta.persistence.*; 
import lombok.*;              
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientId; 
    private String nom;
    private String prenom;
    private String sexe;
    private LocalDate dateNaissance;
    private String adresse;
    private String telephone;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DossierMedical> dossiers;

}

