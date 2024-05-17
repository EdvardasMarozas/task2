-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2024 at 07:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `cart_id` int(10) UNSIGNED DEFAULT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `cart_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 14),
(2, 1, 5, 1),
(3, 1, 8, 1),
(4, 1, 12, 1),
(5, 1, 17, 1),
(6, 2, 2, 1),
(7, 2, 6, 1),
(8, 2, 9, 1),
(9, 2, 13, 1),
(10, 2, 18, 1),
(11, 3, 3, 3),
(12, 3, 7, 1),
(13, 3, 10, 1),
(14, 3, 14, 1),
(15, 3, 19, 1),
(16, 4, 4, 1),
(17, 4, 8, 1),
(18, 4, 11, 1),
(19, 4, 15, 1),
(20, 4, 20, 1),
(21, 5, 5, 1),
(22, 5, 9, 1),
(23, 5, 12, 1),
(24, 5, 16, 1),
(25, 5, 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Home Decor & Furnishings'),
(2, 'Outdoor Gear & Equipment'),
(3, 'Health & Wellness Products'),
(4, 'Electronics & Gadgets');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `price` int(11) NOT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `categories_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `photo`, `categories_id`) VALUES
(1, 'Rustic Wooden Coffee Table', 150, 'https://source.unsplash.com/300x200/?wood', 1),
(2, 'Modern Geometric Area Rug', 80, 'https://source.unsplash.com/300x200/?rug', 1),
(3, 'Vintage Glass Vase Set', 40, 'https://source.unsplash.com/300x200/?vase', 1),
(4, 'Cozy Knit Throw Blanket', 30, 'https://source.unsplash.com/300x200/?blanket', 1),
(5, 'Elegant Floor Lamp', 100, 'https://source.unsplash.com/300x200/?lamp', 1),
(6, 'Minimalist Wall Clock', 20, 'https://source.unsplash.com/300x200/?clock', 1),
(7, 'Scandinavian Style Armchair', 200, 'https://source.unsplash.com/300x200/?armchair', 1),
(8, 'Botanical Print Pillow Covers', 15, 'https://source.unsplash.com/300x200/?pillow', 1),
(9, 'Antique Brass Candle Holders', 50, 'https://source.unsplash.com/300x200/?candle', 1),
(10, 'Artificial Potted Plants', 25, 'https://source.unsplash.com/300x200/?plant', 1),
(11, 'Camping Tent for 4 People', 200, 'https://source.unsplash.com/300x200/?tent', 2),
(12, 'Hiking Backpack with Hydration System', 90, 'https://source.unsplash.com/300x200/?backpack', 2),
(13, 'Portable Folding Chair with Cooler', 50, 'https://source.unsplash.com/300x200/?chair', 2),
(14, 'Insulated Stainless Steel Water Bottle', 20, 'https://source.unsplash.com/300x200/?bottle', 2),
(15, 'Compact LED Camping Lantern', 30, 'https://source.unsplash.com/300x200/?lantern', 2),
(16, 'Trail Running Shoes', 80, 'https://source.unsplash.com/300x200/?shoes', 2),
(17, 'UV Protection Hiking Hat', 15, 'https://source.unsplash.com/300x200/?hat', 2),
(18, 'Outdoor Picnic Blanket', 25, 'https://source.unsplash.com/300x200/?picnic', 2),
(19, 'Collapsible Trekking Poles', 40, 'https://source.unsplash.com/300x200/?poles', 2),
(20, 'Solar-Powered Portable Charger', 60, 'https://source.unsplash.com/300x200/?charger', 2),
(21, 'Yoga Mat with Alignment Lines', 30, 'https://source.unsplash.com/300x200/?yoga', 3),
(22, 'Foam Roller for Muscle Recovery', 20, 'https://source.unsplash.com/300x200/?foam-roller', 3),
(23, 'Essential Oil Diffuser', 40, 'https://source.unsplash.com/300x200/?diffuser', 3),
(24, 'Fitness Tracker Watch', 70, 'https://source.unsplash.com/300x200/?fitness', 3),
(25, 'Organic Cotton Bath Towel Set', 35, 'https://source.unsplash.com/300x200/?towel', 3),
(26, 'Healthy Meal Prep Containers', 15, 'https://source.unsplash.com/300x200/?meal-prep', 3),
(27, 'Adjustable Dumbbell Set', 150, 'https://source.unsplash.com/300x200/?dumbbell', 3),
(28, 'Meditation Cushion', 25, 'https://source.unsplash.com/300x200/?meditation', 3),
(29, 'Portable Blender for Smoothies', 40, 'https://source.unsplash.com/300x200/?blender', 3),
(30, 'Aromatherapy Scented Candles', 10, 'https://source.unsplash.com/300x200/?candles', 3),
(31, 'Wireless Bluetooth Earbuds', 80, 'https://source.unsplash.com/300x200/?earbuds', 4),
(32, 'Smart Home Security Camera', 130, 'https://source.unsplash.com/300x200/?security-camera', 4),
(33, 'High-Speed USB-C Charging Cable', 13, 'https://source.unsplash.com/300x200/?usb-cable', 4),
(34, 'Smartphone Tripod Stand', 20, 'https://source.unsplash.com/300x200/?tripod', 4),
(35, 'Portable External Battery Pack', 50, 'https://source.unsplash.com/300x200/?battery-pack', 4),
(36, 'Wireless Charging Pad', 30, 'https://source.unsplash.com/300x200/?wireless-charger', 4),
(37, 'Compact Digital Camera', 300, 'https://source.unsplash.com/300x200/?camera', 4),
(38, 'Bluetooth Speaker with LED Lights', 60, 'https://source.unsplash.com/300x200/?speaker', 4),
(39, 'Smartwatch with Fitness Tracker', 150, 'https://source.unsplash.com/300x200/?smartwatch', 4),
(40, 'Wireless Keyboard and Mouse Set', 40, 'https://source.unsplash.com/300x200/?keyboard-mouse', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`) VALUES
(1, 'Jonas Petrauskas', 'jonas.petrauskas@example.com'),
(2, 'Gabija Kazlauskaitė', 'gabija.kazlauskaitė@example.com'),
(3, 'Tomas Jankauskas', 'tomas.jankauskas@example.com'),
(4, 'Giedrė Stankevičiūtė', 'giedrė.stankevičiūtė@example.com'),
(5, 'Lukas Mačiulis', 'lukas.maciulis@example.com'),
(6, 'Eglė Petrauskienė', 'eglė.petrauskienė@example.com'),
(7, 'Marius Vaičiūnas', 'marius.vaičiūnas@example.com'),
(8, 'Laura Žilinskaitė', 'laura.žilinskaitė@example.com'),
(9, 'Simonas Balčiūnas', 'simonas.balčiūnas@example.com'),
(10, 'Indrė Grigaitė', 'indrė.grigaitė@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2ce9fc2d-8d44-4d56-8c55-8151bf15bae3', 'c63159233262715413832e015d190034e4f407125992018d5a44536b9ebdd022', '2024-05-14 20:49:14.179', '20240514204914_init6', NULL, NULL, '2024-05-14 20:49:14.135', 1),
('34408507-6635-40a2-8752-d458b8cf8635', '051990bd60240a19fdfa5f2a8f71a84d05b0c55b6c553c5f161b3811db579435', '2024-05-14 20:40:45.491', '20240514204045_init5', NULL, NULL, '2024-05-14 20:40:45.470', 1),
('466950de-d05d-4fad-ba58-91b960950b61', '66920b6c912a95fdfff7eea9cb52967a654082965b246b9a511ae55b84cdff87', '2024-05-14 20:33:17.642', '20240514190439_init3', NULL, NULL, '2024-05-14 20:33:17.527', 1),
('48e73c61-146b-4581-9c90-0451ec385b75', 'e047515595e1e307f08e810c0a0c8bea5810ff9e52b421ebfd2f597b786da236', '2024-05-14 20:50:11.181', '20240514205011_init8', NULL, NULL, '2024-05-14 20:50:11.156', 1),
('585c62fe-be6d-4d2f-8b12-3be0329940bb', '40e49eafec090638ce500929bff87e9394e97c5b8f2fd446601039cc7720e18d', '2024-05-14 20:50:25.824', '20240514205025_init9', NULL, NULL, '2024-05-14 20:50:25.778', 1),
('7a7af16b-c534-48fd-bff1-2de1c1f2ee65', '239aafb4431944160249aeb8bc861520190510f58b052ce93479f1a01e6c2775', '2024-05-14 20:33:17.415', '20240514145551_init', NULL, NULL, '2024-05-14 20:33:17.308', 1),
('9f242979-bb5f-4862-b2d9-79405b366306', 'd19463766de9055ff3d35f9141d0311bab4b1f0453dd4a59001292fd19bbabc3', '2024-05-14 20:33:17.526', '20240514185244_init2', NULL, NULL, '2024-05-14 20:33:17.417', 1),
('b000e318-ca93-40a0-8e82-143ba65d7416', '3941993cc3b45ebb4090c9159b30022f70b419939f065dde6f21b70f46c0dca8', '2024-05-14 20:33:18.457', '20240514203318_init4', NULL, NULL, '2024-05-14 20:33:18.387', 1),
('fa3385da-1f7a-47d3-ae17-6568776a5f2e', 'a082c4d90886e0c36aa421e573fd644d95db3562ec8181f8645de55d577474a4', '2024-05-17 04:29:34.226', '20240517042911_init10', NULL, NULL, '2024-05-17 04:29:34.209', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Carts_product_id_fkey` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Products_categories_id_fkey` (`categories_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `Carts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `Products_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
