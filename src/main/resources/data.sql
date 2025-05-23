-- Accounts (base table for Providers, Users, Admins)
INSERT INTO accounts (id, email, role, password, created_at, is_deleted) VALUES
(1, 'miller@bil.com', 'ROLE_PROVIDER', '$2a$10$FwNiSdhFl7KFQ0AJ/h2UOukRNccRYi..9qxviTyn6OeOt3FgzquvK', '2025-05-23 01:34:21', FALSE),
(2, 'biller@bil.com', 'ROLE_PROVIDER', '$2a$10$ZoZSXsfxef2Sc2poDnWa4.yTH/XISWO5ZCGnRwNoRx5KJ2IFR1Q2e', '2025-05-23 01:34:21', FALSE),
(3, 'biggernes@tesla.com', 'ROLE_PROVIDER', '$2a$10$e97kYGYw3EZCRaF/bzHNhOfQ.ofYAvglLfAFq5KGEaYcIVsQU1oxi', '2025-05-23 01:34:21', FALSE),
(4, 'tesla@tom.com', 'ROLE_PROVIDER', '$2a$10$FNkUyCalpAIudvZocIb8AOpCbm9kUvBQyAxZVuk5t9pOSt2fthjEi', '2025-05-23 01:34:21', FALSE),
(5, 'auto@99.com', 'ROLE_PROVIDER', '$2a$10$gS1E0Vp9KRJG.DMhpFj9re1/HKtK/519FCmmL.tv3xep76dmWfBuW', '2025-05-23 01:34:21', FALSE),
(6, 'auto@1010.com', 'ROLE_PROVIDER', '$2a$10$cvn1mYwCPJ.gImQkF7QfWO7yV2bxVcJrv4xmjI0dHxkD4HYspPUqq', '2025-05-23 01:34:22', FALSE),
(7, 'bilikist@gmail.com', 'ROLE_PROVIDER', '$2a$10$4nXuyrXsAOrn5PklHL63ruG/QquJgeEm/huPyB9G4G8mGKY7nc20O', '2025-05-23 01:34:22', FALSE),
(8, 'ørsta@kommune.com', 'ROLE_PROVIDER', '$2a$10$.qQbpJsH08TxumQB3cYS1ur70th7PLALewqztM.kb0xhVYool6qIC', '2025-05-23 01:34:22', FALSE),
(9, 'sirkel@sliper.com', 'ROLE_PROVIDER', '$2a$10$y/YyKzMQP0QZz78HhJTWjuPCUEMhbmt0OX.pcfKJnrrwpNGXuLIIu', '2025-05-23 01:34:22', FALSE),
(10, 'peace@per.com', 'ROLE_PROVIDER', '$2a$10$heXvTHqU4acGNKBEJOnVguLKiQ/0rTehv.rZ5MjQZwEGITW6Dy6l2', '2025-05-23 01:34:22', FALSE),
(11, 'bilverksted@gmail.com', 'ROLE_PROVIDER', '$2a$10$oN5nNL.RCafTes0w2RRuJew1AwHjmT3TBDyLsSc5impQfF1W6vA3y', '2025-05-23 01:34:22', FALSE),
(12, 'grabes@gmail.com', 'ROLE_PROVIDER', '$2a$10$YN1Ft6foy4tcYApM.sRUPuykxb/PGrwmEz3pj/8bXGUwP93kml.Te', '2025-05-23 01:34:22', FALSE),
(13, 'djarney@gmail.com', 'ROLE_PROVIDER', '$2a$10$BH/BeCpwSUwSOLmBiw8XBuy7omMPKIjWzN9KlQO8ISmpa0H.DlXuq', '2025-05-23 01:34:23', FALSE),
(14, 'sprekksaver@gmail.com', 'ROLE_PROVIDER', '$2a$10$SulHYZQOA4P24PyAd7aF7Oxhxo9503j.Pppdq2ru/RAE0MZQzRgu.', '2025-05-23 01:34:23', FALSE),
(15, 'smidig@bilforhandler.com', 'ROLE_PROVIDER', '$2a$10$gxa560MZqq64lEQukoeRJegudgfFSoUrQgloAyJ2ezLXqLbZlZ0OO', '2025-05-23 01:34:23', FALSE),
(16, 'fossefall@bilforhandler.com', 'ROLE_PROVIDER', '$2a$10$skzvtv88R9rw6X81gaRgte2zntwJVOJLZmi4dkzr8eplWevclp.XS', '2025-05-23 01:34:23', FALSE),
(17, 'betrel@ostein.com', 'ROLE_PROVIDER', '$2a$10$NyLv2BIIQ4ftVo8aRSCHouncklfBI6qo0Z13taShcjO0U8RKcYoYG', '2025-05-23 01:34:23', FALSE),
(18, 'john.doe@example.com', 'ROLE_USER', '$2a$10$7hZ6aVcD1Enq.W21IxAwmuJ6R8MEKvxYPbOLPzyTiw8V1LEBV1hGi', '2025-05-23 01:34:23', FALSE),
(19, 'jane.smith@example.com', 'ROLE_USER', '$2a$10$8giHGuDEtX2Bzi0ZATcAbOgHJpUi/cWCjjm5P9tPjOG.QJOEsJBn6', '2025-05-23 01:34:23', FALSE),
(20, 'alice.johnson@example.com', 'ROLE_USER', '$2a$10$KG4gb.IquTlmiTj5GgDMMOU7aWIkOti4LB87rmtjJv/43WfK8WS1q', '2025-05-23 01:34:24', FALSE),
(21, 'bob.brown@example.com', 'ROLE_USER', '$2a$10$xPLUDjWHegAnLXvIzB978uTyP6ATKFJKztJkzbJOqmyhVDpZN4W4i', '2025-05-23 01:34:24', FALSE),
(22, 'charlie.davis@example.com', 'ROLE_USER', '$2a$10$VNDKzegTfsXL2Lnt8PgMc.p.yBWBzEAGMMQ4lnynabvNm9np9eLky', '2025-05-23 01:34:24', FALSE),
(23, 'emily.wilson@example.com', 'ROLE_USER', '$2a$10$nSUt4UyfoB87bN7vfLlfSeaR.AzFculxe/MMJ5Iob6HW8AB4A4K3.', '2025-05-23 01:34:24', FALSE),
(24, 'david.taylor@example.com', 'ROLE_USER', '$2a$10$w679/j1AYNvhz5a3.Jeu5uopAWWIt9J9684CrCJTQWkfIyW9lfS1q', '2025-05-23 01:34:24', FALSE),
(25, 'sophia.anderson@example.com', 'ROLE_USER', '$2a$10$bbtIQEStqfhCDmINtuUSXe6knuKOj0UoYWTT1n7Eb13dFjQm5yVIa', '2025-05-23 01:34:24', FALSE),
(26, 'michael.thomas@example.com', 'ROLE_USER', '$2a$10$upSF1U0tGe3h7vzLDA.5SOHSU7aDys.4nJIXFbT5PsrReSYmP7Xtq', '2025-05-23 01:34:24', FALSE),
(27, 'olivia.martinez@example.com', 'ROLE_USER', '$2a$10$ahuae.koHkMEOACg7tyvt.R0lbQbRcFwbPgPeQJ2kHXCjdZicNAri', '2025-05-23 01:34:25', FALSE),
(28, 'lucas.evans@example.com', 'ROLE_USER', '$2a$10$Yj9Gub/ghoSuQF9R/aWX4.zbmCzZkHo.V7ucwiHPXby9.K6pNIT5S', '2025-05-23 01:34:25', FALSE),
(29, 'mia.walker@example.com', 'ROLE_USER', '$2a$10$/vue7cqZi1XzJla9nXre4uRN8BVEW6hayOxXcdL7.93zZwwQzFU3i', '2025-05-23 01:34:25', FALSE),
(30, 'ethan.hall@example.com', 'ROLE_USER', '$2a$10$3WORp6AiciiTDmF6deP0E.EYJ9cIHFCE/q86/I3TozEVHAvsahkFu', '2025-05-23 01:34:25', FALSE),
(31, 'ava.young@example.com', 'ROLE_USER', '$2a$10$xlwBsOzT.688NiRC3XI6hePzo8Z9Zc3S/DirGtBLw6b6A6wcwRgdS', '2025-05-23 01:34:25', FALSE),
(32, 'noah.king@example.com', 'ROLE_USER', '$2a$10$tqMKvXQKXYdJg2H2ydFCY.fgXsy60sq3AaoLFwOQDUbbiiXK9JSsu', '2025-05-23 01:34:25', FALSE),
(33, 'isabella.wright@example.com', 'ROLE_USER', '$2a$10$c.XqA84.TS5zY8t64/jPyOeAyOeCN2447cZPIWIcW0LJQhEGF.Tsi', '2025-05-23 01:34:25', FALSE),
(34, 'logan.scott@example.com', 'ROLE_USER', '$2a$10$wrluguu5f707fJXI1sx9CufkL.7gEWMM/H1x788yfrD4eIzozDo9u', '2025-05-23 01:34:26', FALSE),
(35, 'charlotte.green@example.com', 'ROLE_USER', '$2a$10$5cq18xQipY23chi.R6Y4FOB28PAvySUgoDUtjsSquay/Kz2dxrZ06', '2025-05-23 01:34:26', FALSE),
(36, 'james.baker@example.com', 'ROLE_USER', '$2a$10$GUw09gKCvTS2en37jBTCrus1vcehHTd5faDGCTZeK4KOPUqxw99Cq', '2025-05-23 01:34:26', FALSE),
(37, 'amelia.adams@example.com', 'ROLE_USER', '$2a$10$r5.y3M0aYkfGJhyT4TcF2OJyJ.qMpeGD3JeDOKN.Wypzc..GDiP3G', '2025-05-23 01:34:26', FALSE),
(38, 'benjamin.nelson@example.com', 'ROLE_USER', '$2a$10$tDYx.LnfgiAFs3i0zvwWSOGtD1HX0b4d3uxstKkhL31NgEivT8oOa', '2025-05-23 01:34:26', FALSE),
(39, 'harper.carter@example.com', 'ROLE_USER', '$2a$10$DFl78FZwMbGb9HdcqQh2out.8TiixFdPvOyIsdzLr4yzusNFZWgV.', '2025-05-23 01:34:26', FALSE),
(40, 'elijah.mitchell@example.com', 'ROLE_USER', '$2a$10$ZXeJDTqx9K31hGt8a5.6uOgnUB4dRUiJxbLXCZBpFiKETbvFfZS1a', '2025-05-23 01:34:26', FALSE),
(41, 'emily.perez@example.com', 'ROLE_USER', '$2a$10$/x4q44gIEX/D.snn5nzhmeIMfdMZbORsB1qnJg1ANTY7YIz3NsqvS', '2025-05-23 01:34:27', FALSE),
(42, 'alexander.roberts@example.com', 'ROLE_USER', '$2a$10$mJ2ZKueyyILYCwNO7SSibOpZ89M9DTexXvz7qniARY.Q/GOj/Ay.i', '2025-05-23 01:34:27', FALSE),
(43, 'admin@admin.com', 'ROLE_ADMIN', '$2a$10$d2XLgqvJHNK/ylabl.qg5.apsbn8oAqnSvJMRHX3EJvkBQeu..OUS', '2025-05-23 01:34:27', FALSE),
(44, 'chuck', 'ROLE_ADMIN', '$2a$10$npVKmQ9ldAEWqXY398CCyemNbfYsJ3dxpgaYtR6tfJ2aV.A9SvQ9W', '2025-05-23 01:34:27', FALSE);

-- Providers
INSERT INTO providers (id, company_name, phone_number) VALUES
(1, 'Miller Bil', '11111111'),
(2, 'Biller Bil', '22222222'),
(3, 'Biggernes Tesla', '33333333'),
(4, 'Tesla Tom', '44444444'),
(5, 'Auto 9-9', '55555555'),
(6, 'Auto 10-10', '66666666'),
(7, 'Bilikist', '77777777'),
(8, 'Ørsta Kommune', '88888888'),
(9, 'Sirkelsliper', '99999999'),
(10, 'Peace Per', '10101010'),
(11, 'Bilverksted', '12121212'),
(12, 'Grabes', '13131313'),
(13, 'Djarney', '14141414'),
(14, 'Sprekksaver', '15151515'),
(15, 'Smidig Bilforhandler', '16161616'),
(16, 'Fossefall Bilforhandler', '17171717'),
(17, 'Betrel Ostein', '18181818');

-- Users
INSERT INTO users (id, first_name, last_name, phone_number) VALUES
(18, 'John', 'Doe', '12345678'),
(19, 'Jane', 'Smith', '87654321'),
(20, 'Alice', 'Johnson', '11223344'),
(21, 'Bob', 'Brown', '44332211'),
(22, 'Charlie', 'Davis', '55667788'),
(23, 'Emily', 'Wilson', '88776655'),
(24, 'David', 'Taylor', '99887766'),
(25, 'Sophia', 'Anderson', '66778899'),
(26, 'Michael', 'Thomas', '77889900'),
(27, 'Olivia', 'Martinez', '99001122'),
(28, 'Lucas', 'Evans', '22334455'),
(29, 'Mia', 'Walker', '33445566'),
(30, 'Ethan', 'Hall', '44556677'),
(31, 'Ava', 'Young', '55667788'),
(32, 'Noah', 'King', '66778899'),
(33, 'Isabella', 'Wright', '77889900'),
(34, 'Logan', 'Scott', '88990011'),
(35, 'Charlotte', 'Green', '99001122'),
(36, 'James', 'Baker', '10111213'),
(37, 'Amelia', 'Adams', '12131415'),
(38, 'Benjamin', 'Nelson', '13141516'),
(39, 'Harper', 'Carter', '14151617'),
(40, 'Elijah', 'Mitchell', '15161718'),
(41, 'Emily', 'Perez', '16171819'),
(42, 'Alexander', 'Roberts', '17181920');

-- Admins
INSERT INTO admins (id, name) VALUES
(43, 'Admin'),
(44, 'chuck');

-- Extra Features
INSERT INTO extra_features (id, name, description) VALUES
(1, 'Bluetooth', 'Wireless technology for audio streaming.'),
(2, 'DAB Radio', 'Digital audio broadcasting for better sound quality.'),
(3, 'Heated Seats', 'Heated seats for comfort.'),
(4, 'Autonomous Driving', 'Self-driving feature for convenience.'),
(5, 'Long Range', 'Extended battery life for electric cars.'),
(6, 'Four Wheel Drive', 'Enhanced traction and control.'),
(7, 'Glass Roof', 'Panoramic roof for a spacious feel.'),
(8, 'Yellow', 'Yellow color for visibility.'),
(9, 'Retro', 'Retro design for a classic look.'),
(10, 'Three Stripes', 'Three stripes design for a sporty look.'),
(11, 'Original Tire Discs', 'Original tire discs for authenticity.'),
(12, 'Tow Hook', 'Tow hook for towing capabilities.'),
(13, 'Travel Box', 'Travel box on the roof for extra storage.'),
(14, 'Glass Window', 'Glass window for visibility.'),
(15, 'Heated Steering Wheel', 'Heated steering wheel for comfort.'),
(16, 'Heated Mirrors', 'Heated mirrors for visibility.'),
(17, 'Heated Tires', 'Heated tires for better grip.'),
(18, 'Heated Floor', 'Heated floor under the rugs for extra comfort.'),
(19, 'Warming 360', 'Warming 360 for even heat distribution.'),
(20, 'FM Radio', 'FM radio for audio entertainment.'),
(21, 'CD Player', 'CD player for audio playback.'),
(22, 'Metallic Paint', 'Metallic paint for a shiny finish.'),
(23, 'Five Doors', 'Five doors for easy access.'),
(24, 'Economic', 'Economic car for fuel efficiency.'),
(25, 'Solar Roof', 'Solar roof for energy efficiency.');

-- Cars (omit id to let DB auto-increment, assign provider_id logically)
INSERT INTO cars (provider_id, plate_number, car_brand, model_name, car_type, price_per_day, production_year, passengers, transmission, energy_source, available, location) VALUES
(1, 'AA 11111', 'Volkswagen', 'Golf', 'HATCHBACK', 600, 2007, 5, 'MANUAL', 'DIESEL', TRUE, 'OSLO'),
(1, 'AA 22222', 'Volkswagen', 'Golf', 'HATCHBACK', 550, 2007, 5, 'MANUAL', 'DIESEL', TRUE, 'OSLO'),
(3, 'AA 33333', 'Tesla', 'Model 3', 'SEDAN', 700, 2019, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'BERGEN'),
(3, 'AA 44444', 'Tesla', 'Model 3', 'SEDAN', 500, 2019, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'BERGEN'),
(3, 'AA 55555', 'Tesla', 'Model Y', 'SUV', 900, 2022, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'STAVANGER'),
(4, 'AA 66666', 'Tesla', 'Model Y', 'SUV', 700, 2022, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'STAVANGER'),
(5, 'AA 77777', 'Nissan', 'Leaf', 'SUV', 500, 2016, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'TRONDHEIM'),
(5, 'AA 88888', 'Nissan', 'Leaf', 'SUV', 500, 2016, 5, 'AUTOMATIC', 'ELECTRIC', TRUE, 'TRONDHEIM'),
(6, 'AA 99999', 'Mazda', '2', 'HATCHBACK', 400, 2017, 5, 'AUTOMATIC', 'GAS', TRUE, 'DRAMMEN'),
(7, 'AB 11111', 'Volkswagen', 'Transporter', 'MINIVAN', 200, 1978, 8, 'MANUAL', 'GAS', TRUE, 'ÅLESUND'),
(7, 'AB 22222', 'Volkswagen', 'Transporter', 'MINIVAN', 70, 1978, 8, 'MANUAL', 'GAS', TRUE, 'ÅLESUND'),
(8, 'AC 88888', 'Volkswagen', 'Transporter', 'MINIVAN', 180, 1978, 8, 'MANUAL', 'GAS', TRUE, 'TROMSØ'),
(9, 'AB 33333', 'BMW', 'M3', 'SPORTS', 400, 1988, 4, 'MANUAL', 'GAS', TRUE, 'OSLO'),
(9, 'AB 44444', 'BMW', 'M3', 'SPORTS', 450, 1988, 4, 'MANUAL', 'GAS', TRUE, 'OSLO'),
(9, 'AC 77777', 'BMW', 'M3', 'SPORTS', 449, 1988, 4, 'MANUAL', 'GAS', TRUE, 'OSLO'),
(10, 'AB 55555', 'Skoda', 'Fabia', 'HATCHBACK', 300, 2011, 5, 'AUTOMATIC', 'DIESEL', TRUE, 'BERGEN'),
(10, 'AB 66666', 'Skoda', 'Fabia', 'HATCHBACK', 299, 2011, 5, 'AUTOMATIC', 'DIESEL', TRUE, 'BERGEN'),
(10, 'AC 66666', 'Skoda', 'Fabia', 'HATCHBACK', 700, 2011, 5, 'AUTOMATIC', 'DIESEL', TRUE, 'TROMSØ'),
(11, 'AB 77777', 'Peugeot', '307 SW', 'STATION_WAGON', 600, 2008, 5, 'MANUAL', 'DIESEL', TRUE, 'DRAMMEN'),
(11, 'AB 88888', 'Peugeot', '307 SW', 'STATION_WAGON', 550, 2008, 5, 'MANUAL', 'DIESEL', TRUE, 'ÅLESUND'),
(12, 'AB 99999', 'Peugeot', '207', 'HATCHBACK', 500, 2007, 5, 'MANUAL', 'DIESEL', TRUE, 'STAVANGER'),
(12, 'AC 11111', 'Peugeot', '207', 'HATCHBACK', 550, 2007, 5, 'MANUAL', 'DIESEL', TRUE, 'TRONDHEIM'),
(13, 'AC 22222', 'Peugeot', '3008', 'CROSSOVER', 600, 2010, 5, 'MANUAL', 'DIESEL', TRUE, 'TRONDHEIM'),
(13, 'AC 33333', 'Peugeot', '3008', 'CROSSOVER', 600, 2010, 5, 'MANUAL', 'DIESEL', TRUE, 'ÅLESUND'),
(14, 'AC 44444', 'Peugeot', 'iOn', 'HATCHBACK', 200, 2015, 4, 'AUTOMATIC', 'ELECTRIC', TRUE, 'STAVANGER'),
(14, 'AC 55555', 'Peugeot', 'iOn', 'HATCHBACK', 201, 2015, 4, 'AUTOMATIC', 'ELECTRIC', TRUE, 'STAVANGER');

-- Cars Extra Features
INSERT INTO cars_extra_features (car_id, extra_feature_id) VALUES
(1, 1), (1, 2), (1, 3), -- VW Golf (AA 11111)
(2, 1), (2, 2), (2, 3), -- VW Golf (AA 22222)
(3, 3), (3, 4), (3, 5), -- Tesla Model 3 (AA 33333)
(4, 3), (4, 4), (4, 5), -- Tesla Model 3 (AA 44444)
(5, 4), (5, 6), (5, 7), -- Tesla Model Y (AA 55555)
(6, 4), (6, 6), (6, 7), -- Tesla Model Y (AA 66666)
(9, 2), -- Mazda 2
(10, 8), (10, 9), -- VW Transporter (AB 11111)
(11, 8), (11, 9), -- VW Transporter (AB 22222)
(12, 8), (12, 9), -- VW Transporter (AC 88888)
(13, 10), (13, 11), -- BMW M3 (AB 33333)
(14, 10), (14, 11), -- BMW M3 (AB 44444)
(15, 10), (15, 11), -- BMW M3 (AC 77777)
(16, 12), -- Skoda Fabia (AB 55555)
(17, 12), -- Skoda Fabia (AB 66666)
(18, 12), -- Skoda Fabia (AC 66666)
(19, 13), -- Peugeot 307 SW (AB 77777)
(20, 13), -- Peugeot 307 SW (AB 88888)
(21, 3), (21, 14), (21, 15), (21, 16), (21, 17), (21, 18), (21, 19), -- Peugeot 207 (AB 99999)
(22, 3), (22, 14), (22, 15), (22, 16), (22, 17), (22, 18), (22, 19), -- Peugeot 207 (AC 11111)
(23, 20), (23, 21), (23, 22), -- Peugeot 3008 (AC 22222)
(24, 20), (24, 21), (24, 22), -- Peugeot 3008 (AC 33333)
(25, 23), (25, 24), -- Peugeot iOn (AC 44444)
(26, 23), (26, 24); -- Peugeot iOn (AC 55555)

-- Rentals
INSERT INTO rentals (rental_id, renter_id, provider_id, car_id, start_date, end_date, pickup_location, dropoff_location, total_cost, status) VALUES
(1, 18, 1, 1, '2025-01-01 00:00:00', '2025-01-10 00:00:00', 'Oslo', 'Bergen', 5400.0, 'COMPLETED'),
(2, 19, 1, 1, '2025-03-05 00:00:00', '2025-03-15 00:00:00', 'Oslo', 'Bergen', 5400.0, 'COMPLETED'),
(3, 20, 1, 1, '2025-06-10 00:00:00', '2025-06-20 00:00:00', 'Oslo', 'Bergen', 5400.0, 'PENDING'),
(4, 21, 1, 1, '2025-09-01 00:00:00', '2025-09-10 00:00:00', 'Oslo', 'Bergen', 5400.0, 'PENDING'),
(5, 22, 1, 1, '2025-12-20 00:00:00', '2025-12-31 00:00:00', 'Oslo', 'Bergen', 5940.0, 'PENDING'),
(6, 23, 3, 5, '2025-02-15 00:00:00', '2025-02-28 00:00:00', 'Stavanger', 'Oslo', 11700.0, 'COMPLETED'),
(7, 24, 4, 6, '2025-02-15 00:00:00', '2025-02-28 00:00:00', 'Stavanger', 'Oslo', 9100.0, 'COMPLETED'),
(8, 25, 3, 5, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 'Stavanger', 'Oslo', 27900.0, 'PENDING'),
(9, 26, 4, 6, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 'Stavanger', 'Oslo', 21700.0, 'PENDING'),
(10, 27, 3, 5, '2025-12-15 00:00:00', '2025-12-31 00:00:00', 'Stavanger', 'Oslo', 14400.0, 'PENDING'),
(11, 28, 4, 6, '2025-12-15 00:00:00', '2025-12-31 00:00:00', 'Stavanger', 'Oslo', 11200.0, 'PENDING'),
(12, 29, 9, 13, '2025-01-01 00:00:00', '2025-04-30 00:00:00', 'Oslo', 'Oslo', 48000.0, 'COMPLETED'),
(13, 30, 9, 13, '2025-05-01 00:00:00', '2025-08-31 00:00:00', 'Oslo', 'Oslo', 49200.0, 'ACTIVE'),
(14, 31, 9, 13, '2025-09-01 00:00:00', '2025-12-31 00:00:00', 'Oslo', 'Oslo', 48400.0, 'PENDING'),
(15, 32, 9, 14, '2025-01-01 00:00:00', '2025-06-30 00:00:00', 'Oslo', 'Oslo', 81000.0, 'ACTIVE'),
(16, 23, 9, 14, '2025-07-01 00:00:00', '2025-12-31 00:00:00', 'Oslo', 'Oslo', 82800.0, 'PENDING'),
(17, 24, 9, 15, '2025-01-01 00:00:00', '2025-03-31 00:00:00', 'Oslo', 'Oslo', 39951.0, 'COMPLETED'),
(18, 25, 9, 15, '2025-04-01 00:00:00', '2025-06-30 00:00:00', 'Oslo', 'Oslo', 40861.0, 'ACTIVE'),
(19, 26, 9, 15, '2025-07-01 00:00:00', '2025-09-30 00:00:00', 'Oslo', 'Oslo', 41391.0, 'PENDING'),
(20, 27, 9, 15, '2025-10-01 00:00:00', '2025-12-31 00:00:00', 'Oslo', 'Oslo', 41859.0, 'PENDING');