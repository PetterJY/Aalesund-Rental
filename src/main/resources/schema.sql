CREATE TABLE accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE admins (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES accounts(id)
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES accounts(id)
);

CREATE TABLE providers (
    id BIGINT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES accounts(id)
);

CREATE TABLE extra_features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE cars (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT NOT NULL,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    car_brand VARCHAR(255) NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    car_type VARCHAR(50) NOT NULL,
    price_per_day INT NOT NULL,
    production_year INT NOT NULL,
    passengers INT NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    energy_source VARCHAR(50) NOT NULL,
    available BOOLEAN NOT NULL,
    location VARCHAR(50) NOT NULL,
    FOREIGN KEY (provider_id) REFERENCES providers(id)
);

CREATE TABLE cars_extra_features (
    car_id BIGINT NOT NULL,
    extra_feature_id BIGINT NOT NULL,
    PRIMARY KEY (car_id, extra_feature_id),
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (extra_feature_id) REFERENCES extra_features(id)
);

CREATE TABLE rentals (
    rental_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    renter_id BIGINT NOT NULL,
    provider_id BIGINT NOT NULL,
    car_id BIGINT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255) NOT NULL,
    total_cost DOUBLE NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (renter_id) REFERENCES users(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE user_favourites (
    user_id BIGINT NOT NULL,
    car_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, car_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL UNIQUE,
    issued_at DATETIME NOT NULL,
    expiration_date DATETIME NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    account_id BIGINT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);