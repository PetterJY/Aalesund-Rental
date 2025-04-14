package no.ntnu.entity.exceptions;

/**
 * Exception thrown when a role is not found.
 */
public class RoleNotFoundException extends RuntimeException {
	public RoleNotFoundException(String message) {
		super(message);
	}
}