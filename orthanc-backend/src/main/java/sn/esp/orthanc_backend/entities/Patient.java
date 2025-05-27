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

    private String patientId; // <--- utilisé pour faire le lien avec Orthanc
    private String nom;
    private String prenom;
    private String sexe;
    private LocalDate dateNaissance;
}

