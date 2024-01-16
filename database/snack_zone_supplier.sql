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
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `SupplierId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SupplierName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SupplierImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`SupplierId`),
  UNIQUE KEY `Supplier_SupplierName_key` (`SupplierName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('clqt9j9l40000j6m8c1ue3t2p','Ovaltine','https://utfs.io/f/0b5c4d9c-96e0-4c3e-88a3-41b7bc376254-sa5xjr.jpg',1),('clqt9kcod0001j6m8yc99ul50','Euro','https://utfs.io/f/df498938-1311-4431-b881-fd5145991da5-1uz8t.png',1),('clqt9kqz90002j6m8owohv25l','Jele','https://utfs.io/f/cd216c38-2e24-4670-bbf6-bdc4635c01c3-1xu5w.jpg',1),('clqt9l7oa0003j6m8j63gl32u','Nanaco','https://utfs.io/f/f29c3792-197b-4078-8644-586e971c546c-heta3y.jpg',1),('clqt9mrte0004j6m8r2fh0gy5','Jack \'n Jill','https://utfs.io/f/0e589850-00c7-4a6f-989f-ed201cd69d42-3qk9oy.png',1),('clqtalmvm001mj6m8zys2j860','Fudo','https://utfs.io/f/b7d11185-4ff9-43cc-b464-18d7dd02d831-1vlwa.png',1),('clqz0zttw0001j6405s7i8uhb','YumYum','https://utfs.io/f/41300790-edca-4d1a-ad38-aa9dea6d292d-bwboo0.jpg',1),('clr26ntv00000j66k0u0lzwia','Julie\'s','https://utfs.io/f/b84b2abe-4322-4739-8e07-107772a247d5-1of719.jpg',1);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
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
