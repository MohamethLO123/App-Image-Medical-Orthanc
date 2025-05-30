package sn.esp.orthanc_backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Hopital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
}

