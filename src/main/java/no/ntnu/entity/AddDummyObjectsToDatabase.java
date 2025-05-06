package no.ntnu.entity;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import no.ntnu.entity.models.Cars;

public class AddDummyObjectsToDatabase {

	public static String jwt_token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQG1haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzQ2MTkwNTc4LCJleHAiOjE3NDYxOTQxNzh9.cfoLKyq378-zPT7OwDZ2TtZNrYasfnMK1pIHB_cU6pc";

	public static void main(String[] args) {		
		//addExtraFeature("GPS", "Global Positioning System for navigation.");
		// addExtraFeature("Child Seat", "Safety seat for children.");
		// addExtraFeature("Bluetooth", "Wireless technology for audio streaming.");
		// addExtraFeature("Sunroof", "Glass panel on the roof for sunlight.");
		// addExtraFeature("Leather Seats", "Premium leather upholstery for comfort.");

		addCar("2", "ABD124", "Toyota", "Cucurella", Cars.CarType.SEDAN , 100, 2020, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.GAS, true, "9");
		addCar("2", "XYZ789", "Honda", "Civic", Cars.CarType.SEDAN , 80, 2021, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.HYBRID, true, "10");
		addCar("2", "ABC123", "Toyota", "Corolla", Cars.CarType.HATCHBACK, 70, 2019, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "11");
		addCar("2", "DEF456", "Ford", "Focus", Cars.CarType.HATCHBACK, 75, 2020, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.DIESEL, true, "12");

		addRental("1", "2", "1", "2023-10-01T00:00:00", "2023-10-10T00:00:00", "Oslo", "Bergen", 1000.0, "COMPLETED");
		addRental("1", "2", "2", "2023-10-01T00:00:00", "2023-10-10T00:00:00", "Oslo", "Bergen", 1000.0, "COMPLETED");
		addRental("1", "2", "3", "2023-10-05T00:00:00", "2023-10-15T00:00:00", "Oslo", "Stavanger", 1200.0, "COMPLETED");
		addRental("1", "2", "4", "2023-10-10T00:00:00", "2023-10-20T00:00:00", "Oslo", "Trondheim", 1500.0, "COMPLETED");
	}

	// Add more cars.
	public static void addCar(
		String provider, 
		String plateNumber, 
		String carBrand, 
		String modelName, 
		Cars.CarType carType,
		int pricePerDay, 
		int productionYear, 
		int passengers, 
		Cars.Transmission transmission,
		Cars.EnergySource energySource,
		boolean available, 
		String extraFeatures) {
		HttpClient client = HttpClient.newHttpClient();
		
		String json = "{"
    + "\"providerId\": " + provider + ","
    + "\"plateNumber\": \"" + plateNumber + "\","
    + "\"carBrand\": \"" + carBrand + "\","
    + "\"modelName\": \"" + modelName + "\","
    + "\"carType\": \"" + carType.toFormattedString() + "\","
    + "\"pricePerDay\": " + pricePerDay + ","
    + "\"productionYear\": " + productionYear + ","
    + "\"passengers\": " + passengers + ","
		+ "\"transmission\": \"" + transmission.toFormattedString() + "\","
		+ "\"energySource\": \"" + energySource.toFormattedString() + "\","
    + "\"available\": " + available + ","
    + "\"extraFeatureIds\": " + (extraFeatures == null ? "null" : "[" + extraFeatures + "]")
    + "}";
			HttpRequest request = HttpRequest.newBuilder()
			.uri(URI.create("http://localhost:8080/cars"))
			.header("Content-Type", "application/json")
			.header("Authorization", "Bearer " + jwt_token) 
			.POST(HttpRequest.BodyPublishers.ofString(json))
			.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
						.thenAccept(response -> {
        if (response.statusCode() == 200 || response.statusCode() == 201) {
            System.out.println("Successfully added car with plate " + plateNumber);
        } else {
            System.out.println("Failed to add car with plate " + plateNumber + ". HTTP status: " + response.statusCode());
        }
        System.out.println("Response: " + response.body());
    })
			.join();
	}

	// Add more rentals.
	public static void addRental(

		String renterId, 
		String providerId, 
		String carId, 
		String startDate, 
		String endDate, 
		String pickupLocation, 
		String dropoffLocation, 
		Double totalCost, 
		String status) {
		HttpClient client = HttpClient.newHttpClient();
		
		String json = "{"
		+ "\"renterId\": " + renterId + ","
		+ "\"providerId\": " + providerId + ","
		+ "\"carId\": " + carId + ","
		+ "\"startDate\": \"" + startDate + "\","
		+ "\"endDate\": \"" + endDate + "\","
		+ "\"pickupLocation\": \"" + pickupLocation + "\","
		+ "\"dropoffLocation\": \"" + dropoffLocation + "\","
		+ "\"totalCost\": " + totalCost + ","
		+ "\"status\": \"" + status + "\""
		+ "}";
			HttpRequest request = HttpRequest.newBuilder()
			.uri(URI.create("http://localhost:8080/rentals"))
			.header("Content-Type", "application/json")
			.header("Authorization", "Bearer " + jwt_token) 
			.POST(HttpRequest.BodyPublishers.ofString(json))
			.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
						.thenAccept(response -> {
				if (response.statusCode() == 200 || response.statusCode() == 201) {
						System.out.println("Successfully added rental with ID " + renterId);
				} else {
						System.out.println("Failed to add rental with ID " + renterId + ". HTTP status: " + response.statusCode());
				}
				System.out.println("Response: " + response.body());
		})
			.join();
	}

		// Add more extra features.
	public static void addExtraFeature(
		String name, 
		String description) {
		HttpClient client = HttpClient.newHttpClient();
		
		String json = "{"
		+ "\"name\": \"" + name + "\","
		+ "\"description\": \"" + description + "\""
		+ "}";
			HttpRequest request = HttpRequest.newBuilder()
			.uri(URI.create("http://localhost:8080/extra-features"))
			.header("Content-Type", "application/json")
			.header("Authorization", "Bearer " + jwt_token) 
			.POST(HttpRequest.BodyPublishers.ofString(json))
			.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
						.thenAccept(response -> {
				if (response.statusCode() == 200 || response.statusCode() == 201) {
						System.out.println("Successfully added extra feature with name " + name);
				} else {
						System.out.println("Failed to add extra feature with name " + name + ". HTTP status: " + response.statusCode());
				}
				System.out.println("Response: " + response.body());
		})
			.join();
	}
}