package sn.esp.orthanc_backend.security;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String motDePasse;
}

