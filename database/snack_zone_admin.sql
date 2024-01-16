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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `AdminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AdminRoleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`AdminId`),
  UNIQUE KEY `Admin_Email_key` (`Email`),
  KEY `Admin_AdminRoleId_fkey` (`AdminRoleId`),
  CONSTRAINT `Admin_AdminRoleId_fkey` FOREIGN KEY (`AdminRoleId`) REFERENCES `adminrole` (`AdminRoleId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('clqqorxhg0002j6r03lfbhlwy','Admin user','admin@gmail.com','a25cf0ae55d8a64e4b453953fd0b45cfdb8237443c1f197e81d38489b5bcb7d7','clqqorxh30000j6r0zetxgulw',1),('clqynle9e0000j640j8imsvaq','John','john@gmail.com','84e94aa89aec113fa88d03d6a44c0324cfcaa58d1728af3281367871f518c2aa','clqqorxhb0001j6r0hg3eyhd4',1),('clqz3ylcb0005j6402be9d2z9','Kyaw Kyaw Oo','kyawoo@gmail.com','978a248b13338f8b65858a903d049fbb9afa2acc3bd3e5daf057adce630d338d','clqqorxh30000j6r0zetxgulw',0),('clr27ga2p0004j66kn8ujaxry','Ted','ted@gmail.com','799c442f201899433f986ad54edaea534456a97ce13e9c6193d15dfe0717e9c4','clqqorxhb0001j6r0hg3eyhd4',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 20:15:00
