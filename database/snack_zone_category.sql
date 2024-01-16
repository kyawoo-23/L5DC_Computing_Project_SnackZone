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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CategoryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CategoryImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`CategoryId`),
  UNIQUE KEY `Category_CategoryName_key` (`CategoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('clqt9zd9q000gj6m8vah6s0q1','Cake','https://utfs.io/f/7b92e8d6-75ae-40da-94a7-2781392c64b8-1k7ubf.jpg',1),('clqta3qqg000hj6m88q387xjp','Jelly','https://utfs.io/f/7fe6ea75-4645-40d7-af2e-eeb3f30d728d-scmcxw.jpg',1),('clqta429v000ij6m8ghu2huki','Cookie','https://utfs.io/f/5b089095-65fa-4cb1-9505-9a49373c8c03-fqwq6n.jpg',1),('clqta4d0m000jj6m80oivcjun','Wafer','https://utfs.io/f/aed9d01f-16df-4a41-ba5f-d8a285c1d67b-d5jp4m.jpg',1),('clqz1ry9e0002j640kp4g217n','Noodles','https://utfs.io/f/5aabe935-efdc-44bb-8e97-397815032146-h73gdt.avif',1),('clr270ueh0001j66k39h916rb','Biscuits','https://utfs.io/f/463f8c4a-00d6-41c8-8fc7-e79f0762ab2a-hwlz6y.jpg',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
