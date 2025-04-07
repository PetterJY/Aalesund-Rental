package no.ntnu.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for setting up CORS (Cross-Origin Resource Sharing) settings.
 * This allows the server to specify which origins are allowed to access its resources.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Apply to all endpoints
			.allowedOrigins(
				"http://localhost:3000", 
				"http://localhost:3001") // Specific origins
			.allowedMethods(
				"GET", 
				"POST", 
				"PUT", 
				"DELETE", 
				"OPTIONS") // Allowed HTTP methods
			.allowedHeaders("*") // Allow all headers
			.allowCredentials(true) // Allow cookies/auth headers
			.maxAge(3600); // Cache preflight response for 1 hour
	}
}