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
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `VariantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VariantName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VariantColor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`VariantId`),
  UNIQUE KEY `Variant_VariantName_key` (`VariantName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES ('clqt9nmyo0005j6m8vja09v0f','Original','#fff8eb'),('clqt9nuse0006j6m82k2xjlw5','Milk','#ffffff'),('clqt9o3vt0007j6m88jqqly4z','Strawberry','#ff4d4d'),('clqt9odce0008j6m80wlkiw13','Banana','#fff71a'),('clqt9orxl0009j6m86g8vrus4','Pandan','#63f047'),('clqt9p2qq000aj6m8wa7f8btd','Cherry','#ff7a7a'),('clqt9peem000bj6m8whbzydzf','Apple','#42bd00'),('clqt9px7t000cj6m887m6nbtz','Chocolate','#693002'),('clqt9qo0t000dj6m8sm5kvgdc','Cappuccino','#bf7b1d'),('clqtaf8uo0011j6m8oyl6jrpc','Lemon','#faf200'),('clqtafi9q0012j6m8cti5jh7l','Black currant','#5c0075'),('clqtafpbw0013j6m8k67nhe9y','Grape','#e600de'),('clqz2agjd0003j640meym82uz','Spicy','#ff4000'),('clqz6j4uz0006j640mzipsymf','Vegetable','#1adb00'),('clqz6jf9a0007j640uk63b6mv','Pork','#e6bf00'),('clqz6jq9x0008j640ptmgsut7','Seafood','#08d8e7'),('clr27c3bc0003j66knw0ktrdg','Butter','#e5b161'),('clr27qhek0007j66kqhq21ly4','Cheese','#fbdb65'),('clr526rfl0000j61oi94kw8hh','Orange','#ff8400'),('clr527b440001j61o80zeydzs','Coconut','#dedede'),('clr527piv0002j61o0git8efc','Caramel','#f58300'),('clr5288370003j61o2d5kcsot','Blueberry','#4d16e3');
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
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
