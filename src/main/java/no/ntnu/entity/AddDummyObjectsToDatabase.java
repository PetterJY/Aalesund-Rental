package no.ntnu.entity;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import no.ntnu.entity.models.Cars;

public class AddDummyObjectsToDatabase {
	private static final Logger logger =
			LoggerFactory.getLogger(AddDummyObjectsToDatabase.class.getSimpleName());

	public static String jwt_token = "";

	public static void main(String[] args) {
		logger.info("Adding providers to the database.");

		addProvider("Miller Bil", "11111111", "miller@bil.com" , "millerbil");
		addProvider("Biller Bil", "22222222", "biller@bil.com" , "billerbil");
		addProvider("Biggernes Tesla", "33333333", "biggernes@tesla.com" , "biggernestesla");
		addProvider("Tesla Tom", "44444444", "tesla@tom.com" , "teslatom");
		addProvider("Auto 9-9", "55555555", "auto@99.com" , "auto99");
		addProvider("Auto 10-10", "66666666", "auto@1010.com" , "auto1010");
		addProvider("Bilikist", "77777777", "bilikist@gmail.com", "bilikist");
		addProvider("Ørsta Kommune", "88888888", "ørsta@kommune.com", "ørstakommune");
		addProvider("Sirkelsliper", "99999999", "sirkel@sliper.com", "sirkelsliper");
		addProvider("Peace Per", "10101010", "peace@per.com", "peaceper");
		addProvider("Bilverksted", "12121212", "bilverksted@gmail.com", "bilverksted");
		addProvider("Grabes", "13131313", "grabes@gmail.com", "grabes");
		addProvider("Djarney", "14141414", "djarney@gmail.com", "djarney");
		addProvider("Sprekksaver", "15151515", "sprekksaver@gmail.com", "sprekksaver");
		addProvider("Smidig Bilforhandler", "16161616", "smidig@bilforhandler.com", "smidigbilforhandler");
		addProvider("Fossefall Bilforhandler", "17171717", "fossefall@bilforhandler.com", "fossefallbilforhandler");
		addProvider("Betrel Ostein", "18181818", "betrel@ostein.com", "betrelostein");

		logger.info("Finished adding providers to the database.");

		logger.info("Adding renters to the database.");

		addUser("John", "Doe", "john.doe@example.com", "password123", "12345678");
		addUser("Jane", "Smith", "jane.smith@example.com", "password456", "87654321");
		addUser("Alice", "Johnson", "alice.johnson@example.com", "password789", "11223344");
		addUser("Bob", "Brown", "bob.brown@example.com", "password321", "44332211");
		addUser("Charlie", "Davis", "charlie.davis@example.com", "password654", "55667788");
		addUser("Emily", "Wilson", "emily.wilson@example.com", "password987", "88776655");
		addUser("David", "Taylor", "david.taylor@example.com", "password111", "99887766");
		addUser("Sophia", "Anderson", "sophia.anderson@example.com", "password222", "66778899");
		addUser("Michael", "Thomas", "michael.thomas@example.com", "password333", "77889900");
		addUser("Olivia", "Martinez", "olivia.martinez@example.com", "password444", "99001122");
		addUser("Lucas", "Evans", "lucas.evans@example.com", "password555", "22334455");
		addUser("Mia", "Walker", "mia.walker@example.com", "password666", "33445566");
		addUser("Ethan", "Hall", "ethan.hall@example.com", "password777", "44556677");
		addUser("Ava", "Young", "ava.young@example.com", "password888", "55667788");
		addUser("Noah", "King", "noah.king@example.com", "password999", "66778899");
		addUser("Isabella", "Wright", "isabella.wright@example.com", "password000", "77889900");
		addUser("Logan", "Scott", "logan.scott@example.com", "password101", "88990011");
		addUser("Charlotte", "Green", "charlotte.green@example.com", "password202", "99001122");
		addUser("James", "Baker", "james.baker@example.com", "password303", "10111213");
		addUser("Amelia", "Adams", "amelia.adams@example.com", "password404", "12131415");
		addUser("Benjamin", "Nelson", "benjamin.nelson@example.com", "password505", "13141516");
		addUser("Harper", "Carter", "harper.carter@example.com", "password606", "14151617");
		addUser("Elijah", "Mitchell", "elijah.mitchell@example.com", "password707", "15161718");
		addUser("Emily", "Perez", "emily.perez@example.com", "password808", "16171819");
		addUser("Alexander", "Roberts", "alexander.roberts@example.com", "password909", "17181920");

		logger.info("Finished adding renters to the database.");

		logger.info("Adding admins to the database.");

		addAdmin("Admin", "admin@admin.com", "admin123");
		addAdmin("chuck", "chuck", "Nunchucks2024");

		logger.info("Finished adding admins to the database.");

		logger.info("Logging in to get JWT token.");

		jwt_token = login("miller@bil.com", "millerbil");

		if (jwt_token == null || jwt_token.isEmpty()) {
			logger.error("Failed to obtain JWT token. Exiting.");
			return;
		}

		logger.info("Adding extra features to the database.");

		addExtraFeature("Bluetooth", "Wireless technology for audio streaming.");
		addExtraFeature("DAB Radio", "Digital audio broadcasting for better sound quality.");
		addExtraFeature("Heated Seats", "Heated seats for comfort.");
		addExtraFeature("Autonomous Driving", "Self-driving feature for convenience.");
		addExtraFeature("Long Range", "Extended battery life for electric cars.");
		addExtraFeature("Four Wheel Drive", "Enhanced traction and control.");
		addExtraFeature("Glass Roof", "Panoramic roof for a spacious feel.");
		addExtraFeature("Yellow", "Yellow color for visibility.");
		addExtraFeature("Retro", "Retro design for a classic look.");
		addExtraFeature("Three Stripes", "Three stripes design for a sporty look.");
		addExtraFeature("Original Tire Discs", "Original tire discs for authenticity.");
		addExtraFeature("Tow Hook", "Tow hook for towing capabilities.");
		addExtraFeature("Travel Box", "Travel box on the roof for extra storage.");
		addExtraFeature("Glass Window", "Glass window for visibility.");
		addExtraFeature("Heated Steering Wheel", "Heated steering wheel for comfort.");
		addExtraFeature("Heated Mirrors", "Heated mirrors for visibility.");
		addExtraFeature("Heated Tires", "Heated tires for better grip.");
		addExtraFeature("Heated Floor", "Heated floor under the rugs for extra comfort.");
		addExtraFeature("Warming 360", "Warming 360 for even heat distribution.");
		addExtraFeature("FM Radio", "FM radio for audio entertainment.");
		addExtraFeature("CD Player", "CD player for audio playback.");
		addExtraFeature("Metallic Paint", "Metallic paint for a shiny finish.");
		addExtraFeature("Five Doors", "Five doors for easy access.");
		addExtraFeature("Economic", "Economic car for fuel efficiency.");
		addExtraFeature("Solar Roof", "Solar roof for energy efficiency.");

		logger.info("Finished adding extra features to the database.");

		logger.info("Adding cars to the database.");

		addCar("1", "AA 11111", "Volkswagen", "Golf", Cars.CarType.HATCHBACK, 600, 2007, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "1, 2, 3", Cars.Location.OSLO);
		addCar("2", "AA 22222", "Volkswagen", "Golf", Cars.CarType.HATCHBACK, 550, 2007, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "1, 2, 3", Cars.Location.OSLO);
		addCar("3", "AA 33333", "Tesla", "Model 3", Cars.CarType.SEDAN, 700, 2019, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "4, 5, 3", Cars.Location.BERGEN);
		addCar("4", "AA 44444", "Tesla", "Model 3", Cars.CarType.SEDAN, 500, 2019, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "4, 5, 3", Cars.Location.BERGEN);
		addCar("3", "AA 55555", "Tesla", "Model Y", Cars.CarType.SUV, 900, 2022, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "6, 7, 4", Cars.Location.STAVANGER);
		addCar("4", "AA 66666", "Tesla", "Model Y", Cars.CarType.SUV, 700, 2022, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "6, 7, 4", Cars.Location.STAVANGER);
		addCar("5", "AA 77777", "Nissan", "Leaf", Cars.CarType.SUV, 500, 2016, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "", Cars.Location.TRONDHEIM);
		addCar("6", "AA 88888", "Nissan", "Leaf", Cars.CarType.SUV, 500, 2016, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "", Cars.Location.TRONDHEIM);
		addCar("7", "AA 99999", "Mazda", "2", Cars.CarType.HATCHBACK, 400, 2017, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.GAS, true, "2", Cars.Location.DRAMMEN);
		addCar("8", "AB 11111", "Volkswagen", "Transporter", Cars.CarType.MINIVAN, 200, 1978, 8, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "8, 9", Cars.Location.ÅLESUND);
		addCar("9", "AB 22222", "Volkswagen", "Transporter", Cars.CarType.MINIVAN, 70, 1978, 8, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "8, 9", Cars.Location.ÅLESUND);
		addCar("10", "AC 88888", "Volkswagen", "Transporter", Cars.CarType.MINIVAN, 180, 1978, 8, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "8, 9", Cars.Location.TROMSØ);
		addCar("11", "AB 33333", "BMW", "M3", Cars.CarType.SPORTS, 400, 1988, 4, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "10, 11", Cars.Location.OSLO);
		addCar("12", "AB 44444", "BMW", "M3", Cars.CarType.SPORTS, 450, 1988, 4, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "10, 11", Cars.Location.OSLO);
		addCar("13", "AC 77777", "BMW", "M3", Cars.CarType.SPORTS, 449, 1988, 4, Cars.Transmission.MANUAL, Cars.EnergySource.GAS, true, "10, 11", Cars.Location.OSLO);
		addCar("14", "AB 55555", "Skoda", "Fabia", Cars.CarType.HATCHBACK, 300, 2011, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.DIESEL, true, "12", Cars.Location.BERGEN);
		addCar("15", "AB 66666", "Skoda", "Fabia", Cars.CarType.HATCHBACK, 299, 2011, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.DIESEL, true, "12", Cars.Location.BERGEN);
		addCar("16", "AC 66666", "Skoda", "Fabia", Cars.CarType.HATCHBACK, 700, 2011, 5, Cars.Transmission.AUTOMATIC, Cars.EnergySource.DIESEL, true, "12", Cars.Location.TROMSØ);
		addCar("17", "AB 77777", "Peugeot", "307 SW", Cars.CarType.STATION_WAGON, 600, 2008, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "13", Cars.Location.DRAMMEN);
		addCar("6", "AB 88888", "Peugeot", "307 SW", Cars.CarType.STATION_WAGON, 550, 2008, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "13", Cars.Location.ÅLESUND);
		addCar("17", "AB 99999", "Peugeot", "207", Cars.CarType.HATCHBACK, 500, 2007, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "14, 3, 15, 16, 17, 18, 19", Cars.Location.STAVANGER);
		addCar("6", "AC 11111", "Peugeot", "207", Cars.CarType.HATCHBACK, 550, 2007, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "14, 3, 15, 16, 17, 18, 19", Cars.Location.TRONDHEIM);
		addCar("17", "AC 22222", "Peugeot", "3008", Cars.CarType.CROSSOVER, 600, 2010, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "20, 21, 22", Cars.Location.TRONDHEIM);
		addCar("6", "AC 33333", "Peugeot", "3008", Cars.CarType.CROSSOVER, 600, 2010, 5, Cars.Transmission.MANUAL, Cars.EnergySource.DIESEL, true, "20, 21, 22", Cars.Location.ÅLESUND);
		addCar("17", "AC 44444", "Peugeot", "iOn", Cars.CarType.HATCHBACK, 200, 2015, 4, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "23,24", Cars.Location.STAVANGER);
		addCar("6", "AC 55555", "Peugeot", "iOn", Cars.CarType.HATCHBACK, 201, 2015, 4, Cars.Transmission.AUTOMATIC, Cars.EnergySource.ELECTRIC, true, "23,24", Cars.Location.STAVANGER);

		logger.info("Finished adding cars to the database.");

		logger.info("Adding rentals to the database.");

		// Special requirement rentals
		// 1. CARS THAT ARE ALWAYS AVAILABLE - Mazda 2 (car ID 7) - no bookings

		// 2. CARS BUSY FOR ONE PROVIDER BUT AVAILABLE FROM ANOTHER
		// Volkswagen Golf - Provider 1's car is busy but Provider 2's car is always available
		addRental("18", "1", "1", "2025-01-01T00:00:00", "2025-01-10T00:00:00", "Oslo", "Bergen", 5400.0, "COMPLETED");
		addRental("19", "1", "1", "2025-03-05T00:00:00", "2025-03-15T00:00:00", "Oslo", "Bergen", 5400.0, "COMPLETED");
		addRental("20", "1", "1", "2025-06-10T00:00:00", "2025-06-20T00:00:00", "Oslo", "Bergen", 5400.0, "PENDING");
		addRental("21", "1", "1", "2025-09-01T00:00:00", "2025-09-10T00:00:00", "Oslo", "Bergen", 5400.0, "PENDING");
		addRental("22", "1", "1", "2025-12-20T00:00:00", "2025-12-31T00:00:00", "Oslo", "Bergen", 5940.0, "PENDING");
		// No rentals for Provider 2's Golf (car ID 2) - always available

		// 3. CARS BUSY FROM ALL PROVIDERS FOR SPECIFIC WEEKS
		// Tesla Model Y - Both providers have cars booked the same weeks
		// Spring vacation period - already past in May 2025
		addRental("23", "3", "5", "2025-02-15T00:00:00", "2025-02-28T00:00:00", "Stavanger", "Oslo", 11700.0, "COMPLETED");
		addRental("24", "4", "6", "2025-02-15T00:00:00", "2025-02-28T00:00:00", "Stavanger", "Oslo", 9100.0, "COMPLETED");
		// Summer vacation period - future dates
		addRental("25", "3", "5", "2025-07-01T00:00:00", "2025-07-31T00:00:00", "Stavanger", "Oslo", 27900.0, "PENDING"); 
		addRental("26", "4", "6", "2025-07-01T00:00:00", "2025-07-31T00:00:00", "Stavanger", "Oslo", 21700.0, "PENDING");
		// Christmas period - future dates
		addRental("27", "3", "5", "2025-12-15T00:00:00", "2025-12-31T00:00:00", "Stavanger", "Oslo", 14400.0, "PENDING");
		addRental("28", "4", "6", "2025-12-15T00:00:00", "2025-12-31T00:00:00", "Stavanger", "Oslo", 11200.0, "PENDING");

		// 4. CARS FULLY BOOKED FOR THE ENTIRE YEAR (BMW M3)
		// Provider 11 - spans in sequence covering the whole year
		addRental("29", "11", "11", "2025-01-01T00:00:00", "2025-04-30T00:00:00", "Oslo", "Oslo", 48000.0, "COMPLETED");
		addRental("30", "11", "11", "2025-05-01T00:00:00", "2025-08-31T00:00:00", "Oslo", "Oslo", 49200.0, "ACTIVE");
		addRental("31", "11", "11", "2025-09-01T00:00:00", "2025-12-31T00:00:00", "Oslo", "Oslo", 48400.0, "PENDING");

		// Provider 12 - two long periods covering the year
		addRental("32", "12", "12", "2025-01-01T00:00:00", "2025-06-30T00:00:00", "Oslo", "Oslo", 81000.0, "ACTIVE");
		addRental("23", "12", "12", "2025-07-01T00:00:00", "2025-12-31T00:00:00", "Oslo", "Oslo", 82800.0, "PENDING");

		// Provider 13 - quarterly bookings
		addRental("24", "13", "13", "2025-01-01T00:00:00", "2025-03-31T00:00:00", "Oslo", "Oslo", 39951.0, "COMPLETED");
		addRental("25", "13", "13", "2025-04-01T00:00:00", "2025-06-30T00:00:00", "Oslo", "Oslo", 40861.0, "ACTIVE");
		addRental("26", "13", "13", "2025-07-01T00:00:00", "2025-09-30T00:00:00", "Oslo", "Oslo", 41391.0, "PENDING");
		addRental("27", "13", "13", "2025-10-01T00:00:00", "2025-12-31T00:00:00", "Oslo", "Oslo", 41859.0, "PENDING");

		logger.info("Finished adding rentals to the database.");
	}

	// Login to get JWT token.
	public static String login(String email, String password) {
    HttpClient client = HttpClient.newHttpClient();

    String json = "{"
				+ "\"email\": \"" + email + "\","
				+ "\"password\": \"" + password + "\""
				+ "}";

    HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/auth/login"))
				.header("Content-Type", "application/json")
				.POST(HttpRequest.BodyPublishers.ofString(json))
				.build();

    HttpResponse<String> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.join();

    if (response.statusCode() == 200) {
			logger.info("Successfully logged in. Token: " + response.body());
			jwt_token = extractJwtToken(response.body());
			logger.debug("JWT token: " + jwt_token);
			return jwt_token;
    } else {
			logger.error("Failed to log in. HTTP status: " + response.statusCode() + ". Response: " + response.body());
			return null;
    }
}

	// Extract JWT token from the response.
	public static String extractJwtToken(String jsonResponse) {
		try {
			// Create an ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();

			// Parse the JSON response
			JsonNode rootNode = objectMapper.readTree(jsonResponse);

			// Extract the "accessToken" field
			return rootNode.get("accessToken").asText();
		} catch (JsonMappingException e) {
			System.err.println("Threw JsonMappingException: " + e.getMessage());
			return null;
		} catch (JsonProcessingException e) {
			System.err.println("Threw JsonProcessingException: " + e.getMessage());
			return null; 
		}
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
			String extraFeatures,
			Cars.Location location) {
		HttpClient client = HttpClient.newHttpClient();

		String json = "{"
				+ "\"providerId\": " + provider + ","
				+ "\"plateNumber\": \"" + plateNumber + "\","
				+ "\"carBrand\": \"" + carBrand + "\","
				+ "\"modelName\": \"" + modelName + "\","
				+ "\"carType\": \"" + carType.name() + "\","
				+ "\"pricePerDay\": " + pricePerDay + ","
				+ "\"productionYear\": " + productionYear + ","
				+ "\"passengers\": " + passengers + ","
				+ "\"transmission\": \"" + transmission.name() + "\","
				+ "\"energySource\": \"" + energySource.name() + "\","
				+ "\"available\": " + available + ","
				+ "\"location\": \"" + location.name() + "\","
				+ "\"extraFeatureIds\": " + (extraFeatures == null ? "null" : "[" + extraFeatures + "]")
				+ "}";

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/cars"))
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
				})
				.join();
	}

	// Add more admins.
	public static void addAdmin(
			String name,
			String email,
			String password) {
		HttpClient client = HttpClient.newHttpClient();

		String json = "{"
				+ "\"name\": \"" + name + "\","
				+ "\"email\": \"" + email + "\","
				+ "\"password\": \"" + password + "\""
				+ "}";

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/admins/register"))
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + jwt_token)
				.POST(HttpRequest.BodyPublishers.ofString(json))
				.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.thenAccept(response -> {
					if (response.statusCode() == 200 || response.statusCode() == 201) {
						System.out.println("Successfully added admin with name " + name);
					} else {
						System.out.println("Failed to add admin with name " + name + ". HTTP status: " + response.statusCode());
					}
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

		DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
		String formattedStartDate = startDate.formatted(formatter);
		String formattedEndDate = endDate.formatted(formatter);

		String json = "{"
				+ "\"renterId\": " + renterId + ","
				+ "\"providerId\": " + providerId + ","
				+ "\"carId\": " + carId + ","
				+ "\"startDate\": \"" + formattedStartDate + "\","
				+ "\"endDate\": \"" + formattedEndDate + "\","
				+ "\"pickupLocation\": \"" + pickupLocation + "\","
				+ "\"dropoffLocation\": \"" + dropoffLocation + "\","
				+ "\"totalCost\": " + totalCost + ","
				+ "\"status\": \"" + status + "\""
				+ "}";

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/rentals"))
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
				.uri(URI.create("http://localhost:8080/api/extra-features"))
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
				})
				.join();
	}

	// Add more providers.
	public static void addProvider(
			String companyName,
			String phoneNumber,
			String email,
			String password) {
		HttpClient client = HttpClient.newHttpClient();

		String json = "{"
				+ "\"companyName\": \"" + companyName + "\","
				+ "\"phoneNumber\": \"" + phoneNumber + "\","
				+ "\"email\": \"" + email + "\","
				+ "\"password\": \"" + password + "\""
				+ "}";

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/providers/register"))
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + jwt_token)
				.POST(HttpRequest.BodyPublishers.ofString(json))
				.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.thenAccept(response -> {
					if (response.statusCode() == 200 || response.statusCode() == 201) {
						System.out.println("Successfully added provider with name " + companyName);
					} else {
						System.out.println("Failed to add provider with name " + companyName + ". HTTP status: " + response.statusCode());
					}
				})
				.join();
	}

	// Add more renters.
	public static void addUser(
			String firstName,
			String lastName,
			String email,
			String password,
			String phoneNumber) {
		HttpClient client = HttpClient.newHttpClient();

		String json = "{"
				+ "\"firstName\": \"" + firstName + "\","
				+ "\"lastName\": \"" + lastName + "\","
				+ "\"email\": \"" + email + "\","
				+ "\"password\": \"" + password + "\","
				+ "\"phoneNumber\": \"" + phoneNumber + "\""
				+ "}";

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8080/api/users/register"))
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + jwt_token)
				.POST(HttpRequest.BodyPublishers.ofString(json))
				.build();

		client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.thenAccept(response -> {
					if (response.statusCode() == 200 || response.statusCode() == 201) {
						System.out.println("Successfully added user with email " + email);
					} else {
						System.out.println("Failed to add user with email " + email + ". HTTP status: " + response.statusCode());
					}
				})
				.join();
	}
}