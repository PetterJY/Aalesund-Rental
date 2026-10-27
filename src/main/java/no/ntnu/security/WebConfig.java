package no.ntnu.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for setting up CORS (Cross-Origin Resource Sharing) settings.
 * This allows the server to specify which origins are allowed to access its resources.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
	// Comma-separated list, overridable with the CORS_ALLOWED_ORIGINS environment variable
	@Value("${cors.allowed-origins:http://localhost:3000,http://localhost:3001}")
	private String[] allowedOrigins;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins(allowedOrigins)
		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
		.allowedHeaders("*")
		.allowCredentials(true).maxAge(3600); 
	}
}