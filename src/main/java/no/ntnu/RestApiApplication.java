package no.ntnu;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the REST API.
 * This class serves as the entry point for the Spring Boot application.
 */
@SpringBootApplication
public class RestApiApplication {
	public static void main(String[] args) {
		loadEnvVariables();
		System.out.println("JWT SECRET: " + System.getProperty("jwt_secret_key"));
		SpringApplication.run(RestApiApplication.class, args);
	}

	private static void loadEnvVariables() {
		Dotenv dotenv = Dotenv.load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
	}
}