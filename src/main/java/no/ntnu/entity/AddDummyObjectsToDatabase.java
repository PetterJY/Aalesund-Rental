package no.ntnu.entity;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class AddDummyObjectsToDatabase {

	public static String jwt_token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQG1haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzQ1OTMwNjIwLCJleHAiOjE3NDU5MzQyMjB9.IPhqpKH02Zrfiudz9UJErpA39yAMME3Ym7-W6b_8mnk";

	public static void main(String[] args) {		
		addExtraFeature("GPS", "Global Positioning System for navigation.");
		addExtraFeature("Child Seat", "Safety seat for children under 12 years old.");
		addExtraFeature("Bluetooth", "Wireless technology for audio streaming.");
		addExtraFeature("Sunroof", "Glass panel on the roof for sunlight and ventilation.");
		addExtraFeature("Leather Seats", "Premium leather upholstery for comfort.");
		addExtraFeature("Navigation System", "In-car navigation system with maps.");

		addCar("19", "ABD124", "Toyota", "Cucurella", "Sedan", 100, 2020, 5, true, "GAS", true, "1");
		addCar("19", "XYZ789", "Honda", "Civic", "Sedan", 120, 2021, 5, true, "GAS", true, "2");
		addCar("19", "LMN456", "Ford", "Focus", "Hatchback", 110, 2019, 5, true, "GAS", true, "3");
		addCar("19", "QRS321", "Chevrolet", "Malibu", "Sedan", 130, 2022, 5, true, "GAS", true, "4");
		addCar("19", "TUV654", "Nissan", "Altima", "Sedan", 140, 2023, 5, true, "GAS", true, "5");
		addCar("19", "WXY987", "Hyundai", "Elantra", "Sedan", 150, 2024, 5, true, "GAS", true, "6");
		
		addRental("1", "19", "1", "2023-10-01", "2023-10-10", "Oslo", "Bergen", 1000.0, "CONFIRMED");
		addRental("2", "19", "2", "2023-10-05", "2023-10-15", "Stavanger", "Trondheim", 1200.0, "PENDING");	
		addRental("3", "19", "3", "2023-10-10", "2023-10-20", "Kristiansand", "Drammen", 800.0, "CANCELLED");
		addRental("4", "19", "4", "2023-10-15", "2023-10-25", "Bergen", "Oslo", 1500.0, "COMPLETED");
		addRental("5", "19", "5", "2023-10-20", "2023-10-30", "Oslo", "Stavanger", 900.0, "CONFIRMED");
		addRental("6", "19", "6", "2023-10-25", "2023-11-05", "Trondheim", "Bergen", 1100.0, "PENDING");
	}

	// Add more cars.
	public static void addCar(
		String provider, 
		String plateNumber, 
		String carBrand, 
		String modelName, 
		String carType, 
		int pricePerDay, 
		int productionYear, 
		int passengers, 
		boolean automatic, 
		String energySource, 
		boolean available, 
		String extraFeatures) {
		HttpClient client = HttpClient.newHttpClient();
		
		String json = "{"
    + "\"providerId\": " + provider + ","
    + "\"plateNumber\": \"" + plateNumber + "\","
    + "\"carBrand\": \"" + carBrand + "\","
    + "\"modelName\": \"" + modelName + "\","
    + "\"carType\": \"" + carType + "\","
    + "\"pricePerDay\": " + pricePerDay + ","
    + "\"productionYear\": " + productionYear + ","
    + "\"passengers\": " + passengers + ","
    + "\"automatic\": " + automatic + ","
    + "\"energySource\": \"" + energySource + "\","
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
		String featureName, 
		String description) {
		HttpClient client = HttpClient.newHttpClient();
		
		String json = "{"
		+ "\"featureName\": \"" + featureName + "\","
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
						System.out.println("Successfully added extra feature with name " + featureName);
				} else {
						System.out.println("Failed to add extra feature with name " + featureName + ". HTTP status: " + response.statusCode());
				}
				System.out.println("Response: " + response.body());
		})
			.join();
	}
}