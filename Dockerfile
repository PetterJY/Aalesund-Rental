# Use OpenJDK 21 slim as the base image
FROM openjdk:21-jdk-slim

# Install basic tools for debugging (optional)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the fat JAR
COPY target/rental-0.0.1-SNAPSHOT.jar app.jar

# Expose the port (matches docker-compose mapping)
EXPOSE 8081

# Run as non-root user for security
USER 1001

# Set the entrypoint
ENTRYPOINT ["java", "-jar", "app.jar"]