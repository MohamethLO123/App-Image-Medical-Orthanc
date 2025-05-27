package sn.esp.orthanc_backend.entities;

import jakarta.persistence.*; 
import lombok.*;              
import java.time.LocalDate;;

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
}

