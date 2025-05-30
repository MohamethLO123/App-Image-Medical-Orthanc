package sn.esp.orthanc_backend.security;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import sn.esp.orthanc_backend.entities.Role;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private Set<Role> roles;
}
