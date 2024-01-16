-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: snack_zone
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `deliveryservice`
--

DROP TABLE IF EXISTS `deliveryservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryservice` (
  `DeliveryServiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DeliveryServiceName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DeliveryServiceImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`DeliveryServiceId`),
  UNIQUE KEY `DeliveryService_DeliveryServiceName_key` (`DeliveryServiceName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryservice`
--

LOCK TABLES `deliveryservice` WRITE;
/*!40000 ALTER TABLE `deliveryservice` DISABLE KEYS */;
INSERT INTO `deliveryservice` VALUES ('clqt9t27f000ej6m85qj7hbdf','Ninja Van','https://utfs.io/f/bcd0d07b-7765-4b88-b7fe-e24af0706907-6ctbo9.png',1),('clqt9tfbc000fj6m8rfqoobzc','Royal Express','https://utfs.io/f/eb9d7f20-4077-4862-8eef-cc7486734df1-aig2h5.jpg',1),('clqz2uabi0004j640h32oug2y','FedEx','https://utfs.io/f/5ae5f0ba-abac-41e5-a4c0-5623a66533db-1lxmuw.jpg',1),('clr2772sc0002j66kjc0f2ckm','Ups','https://utfs.io/f/290d9217-1997-4cb7-83f2-a6db2a0e8830-2hiw.png',1);
/*!40000 ALTER TABLE `deliveryservice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 20:14:59
