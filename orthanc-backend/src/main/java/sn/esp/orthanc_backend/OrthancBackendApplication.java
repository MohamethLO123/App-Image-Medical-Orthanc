package sn.esp.orthanc_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import sn.esp.orthanc_backend.entities.Hopital;
import sn.esp.orthanc_backend.entities.Role;
import sn.esp.orthanc_backend.entities.Utilisateur;
import sn.esp.orthanc_backend.repositories.HopitalRepository;
import sn.esp.orthanc_backend.repositories.RoleRepository;
import sn.esp.orthanc_backend.repositories.UtilisateurRepository;

@SpringBootApplication
public class OrthancBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrthancBackendApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	
	@Bean
	CommandLineRunner initDatabase(
		UtilisateurRepository utilisateurRepository,
		RoleRepository roleRepository,
		HopitalRepository hopitalRepository,
		PasswordEncoder passwordEncoder
	) {
		return args -> {
			// Créer un hôpital si inexistant
			Hopital hopital = hopitalRepository.findByNom("Hôpital Principal")
					.orElseGet(() -> {
						Hopital h = new Hopital();
						h.setNom("Hôpital Principal");
						h.setAdresse("Dakar");
						return hopitalRepository.save(h);
					});

			// Créer le rôle ADMIN si inexistant
			Role adminRole = roleRepository.findByNom("ADMIN")
					.orElseGet(() -> {
						Role role = new Role();
						role.setNom("ADMIN");
						return roleRepository.save(role);
					});

			// Créer l'utilisateur admin si inexistant
			if (!utilisateurRepository.existsByEmail("admin@hopital.com")) {
				Utilisateur admin = new Utilisateur();
				admin.setNom("Admin");
				admin.setPrenom("Général");
				admin.setEmail("admin@hopital.com");
				admin.setMotDePasse(passwordEncoder.encode("admin123"));
				admin.setTelephone("777000000");
				admin.setHopital(hopital);
				admin.getRoles().add(adminRole);

				utilisateurRepository.save(admin);
				System.out.println(" Utilisateur admin créé avec succès.");
			}
		};
	}

}
