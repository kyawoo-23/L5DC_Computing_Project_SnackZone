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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CustomerId`),
  UNIQUE KEY `Customer_CustomerEmail_key` (`CustomerEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('clqv1x5tt0000j6p06u9r6l1d','Kyaw Kyaw Oo','kkoo@kmd.edu.mm','30a4c9c9a3f4f6b9b4b66b36521190e8ab1a0101f162ffe8ca8846df79a7a63e','09795559054','Lanmadaw, Yangon'),('clr1nicfn0006j6q819jnkut0','Jerry Chen','jerry@gmail.com','38fa0b75caade93da9bcc8b990b4b3361ebf75efcf6ce006c1c03eecce42f30b','095252672281','Mandalay, Myanmar'),('clr8pb2130002j6a8vjf6kj13','Ted','ted@gmail.com','51c084c5c57790faae1606d152520db96a9a06b7c9e144f024acbd52a23a8ffe','09795559054','No. 22, Lanmadaw, Yangon'),('clr98x6l90000j6qo2a2thymg','Jack','jack@gmail.com','10f1115f8cd412807890d7729a095c3c9271a0c53659a18bb0102721e634c577','09123456789','No. 22, Lanmadaw, Yangon');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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
