# Group 10 Repository

A repository for the work of group 10 in the App Development course and the Web Development course.

---

## Project Description: Norwegian Rental

**Norwegian Rental** is a web-based platform developed as a student project for the courses **IDATA2301 Web Technologies** and **IDATA2306 Application Development** at NTNU.  
Our goal is to provide a user-friendly price comparison portal for car rentals, connecting customers with third-party providers across Norway.  
The platform enables users to search, compare, and book rental cars while ensuring transparency and equal treatment of all providers.

---

## User Roles

The application serves three main user roles:

- **Renters:** Search and book vehicles based on location, date, and preferences.  
- **Providers:** Manage their car listings and rental requests.  
- **Administrators:** Oversee platform operations and manage users.

---

## Key Features

### For Users
- **Car Comparisons:** Browse available cars with advanced filtering options (car type, transmission, passengers, energy source, price).  
- **Car Availability:** View availability status with scenarios like always available, partially booked, or fully booked cars in 2025.  
- **Car Details:** View detailed car information and features.  
- **Booking:** Make bookings with specific pickup and dropoff details.  
- **Reservations:** Manage your reservations (view, cancel).  
- **Favourites:** Save favorite cars for quick access.  
- **Account:** Register and create a user account.  
- **User Roles:** Supports visitors and regular users (e.g., username: `dave`, password: `Dangerous2024`).

### For Providers
- **Car Inventory:** List and manage car inventory.  
- **Update Car:** Update car availability and details.  
- **Booking:** Process booking requests.  
- **History:** Track rental history.

### For Administrators
- **Manage Providers**  
- **Monitor Platform Activity**

---

## Technologies Used

### Frontend
- React.js  
- CSS3 (with custom variables for theming)  
- Phosphor Icons  

### Backend
- Java  
- Spring Boot  
- Spring Security with JWT authentication  

### Database
- MySQL  

---

## Getting Started

# Using the Application

The Rental Roulette platform offers different experiences based on your user role. Below are step-by-step guides for common workflows.

---

## For Renters

### Searching for Cars
1. Navigate to the home page and use the booking form to enter your:
   - Pickup location (Oslo, Bergen, Stavanger, etc.)
   - Dropoff location
   - Pickup and dropoff dates/times
2. Click **"Find Your Car"** to view available vehicles.
3. Use filters to refine your search:
   - Car type (Hatchback, SUV, Sedan, etc.)
   - Transmission (Manual, Automatic)
   - Passengers (2-8)
   - Energy source (Electric, Gas, Diesel)
   - Price range (slide to set min/max)

### Booking a Car
1. Select a car from the search results
2. Review car details, features, and pricing
3. Click **"Book Now"**
4. Confirm rental details (dates, locations, total cost)
5. Complete the booking to receive a confirmation

### Managing Bookings
- Access your account by clicking your name in the header
- Navigate to **"Orders"** to view your bookings
- For pending bookings, you can:
  - View complete details
  - Cancel a booking if needed

### Saving Favorites
- When viewing cars, click the heart icon to add to favorites
- Access your favorites from your account menu
- Quickly book your favorite cars for future trips

---

## For Providers

### Managing Your Fleet
1. Log in with your provider credentials
2. Navigate to **"My Rentals"** from your account menu
3. View all cars in your fleet
4. For each car, you can:
   - Edit details (price, features, availability)
   - View booking history
   - Mark as unavailable during maintenance periods

### Adding New Cars
1. From **"My Rentals,"** click the "+" button
2. Fill in car details:
   - Make and model
   - Year and specifications
   - Price per day
   - Available locations
   - Extra features

### Managing Bookings
- View incoming bookings for your vehicles
- Track rental status (Pending, Active, Completed, Cancelled)
- See customer details and rental periods

---

## For Administrators

### Managing Providers
1. Log in with admin credentials
2. Navigate to **"Rentals"** in your account menu
3. Select providers from the sidebar
4. Review provider's fleet and booking history

### Platform Oversight
- Monitor system activity
- Manage user accounts
- Resolve disputes or issues

---

## API Endpoints (For Developers)

The platform exposes RESTful endpoints for integration:

### Authentication
- `POST /auth/login` - User login  
- `POST /users/register` - Register new renter  
- `POST /providers/register` - Register new provider  

### Cars
- `GET /cars?params` - Search cars with filters  
- `GET /cars/{id}` - Get specific car details  
- `POST /cars` - Add new car (provider access)  

### Bookings
- `POST /rentals` - Create new booking  
- `PUT /rentals/{id}` - Update booking status  
- `GET /rentals/user/{userId}` - Get user bookings  

### User Management
- `GET /users/{id}` - Get user details  
- `PUT /users/{id}` - Update user profile  
- `POST /users/{userId}/favourites/{carId}` - Add car to favorites  

---

## Example User Flows

### Weekend Getaway
- Search for cars in Oslo for the upcoming weekend  
- Filter for electric vehicles with 4+ passengers  
- Book a Tesla Model Y for Saturday-Monday  
- Pick up and return the car to the Oslo location  

### Provider Adding a New Car
- Log in as a provider  
- Navigate to **My Rentals**  
- Click **"Add New Car"**  
- Enter details for a 2022 BMW M3  
- Set daily rate and available extras  
- Publish the listing  

---

## Demo Accounts

For demonstration purposes, you can use these pre-populated accounts:

- **Renter:**  
  Email: `john.doe@example.com`  
  Password: `password123`

- **Provider:**  
  Email: `miller@bil.com`  
  Password: `millerbil`

- **Admin:**  
  Email: `admin@admin.com`  
  Password: `admin123`


---

## Team

- Mathias Løvnes  
- Marcus Skaue  
- Petter Ytterdahl  

---

## License

This project was created as part of university coursework at NTNU in the **IDATA2301 Web Technologies** and **IDATA2306 Application Development** courses.

**Disclaimer:** This website is a result of a university group project. All information provided is fictional and created for educational purposes.
