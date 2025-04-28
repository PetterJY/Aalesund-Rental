package no.ntnu.entity;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class AddDummyObjectsToDatabase {

	public static void main(String[] args) {		
		addCar("19", "ABD124", "Toyota", "Corolla", "Sedan", 100, 2020, 5, true, "GAS", true, "1");
		addCar("19", "XYZ789", "Honda", "Civic", "Sedan", 120, 2021, 5, true, "GAS", true, "1");
		addCar("19", "LMN456", "Ford", "Focus", "Hatchback", 110, 2019, 5, true, "GAS", true, "1");
		addCar("19", "QRS321", "Chevrolet", "Malibu", "Sedan", 130, 2022, 5, true, "GAS", true, "1");
		addCar("19", "TUV654", "Nissan", "Altima", "Sedan", 140, 2023, 5, true, "GAS", true, "1");
		addCar("19", "WXY987", "Hyundai", "Elantra", "Sedan", 150, 2024, 5, true, "GAS", true, "1");
		
	}

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
}