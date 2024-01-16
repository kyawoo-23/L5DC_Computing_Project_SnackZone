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
-- Table structure for table `cartproduct`
--

DROP TABLE IF EXISTS `cartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartproduct` (
  `CartProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductQuantity` int NOT NULL,
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductVariantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PurchaseType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`CartProductId`),
  KEY `CartProduct_ProductId_fkey` (`ProductId`),
  KEY `CartProduct_CustomerId_fkey` (`CustomerId`),
  KEY `CartProduct_ProductVariantId_fkey` (`ProductVariantId`),
  CONSTRAINT `CartProduct_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CartProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CartProduct_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `productvariant` (`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartproduct`
--

LOCK TABLES `cartproduct` WRITE;
/*!40000 ALTER TABLE `cartproduct` DISABLE KEYS */;
INSERT INTO `cartproduct` VALUES ('clr8vosc1000vj6a8kfffx1r6',2,'clr52b7450004j61o8lv712yz','clr8pb2130002j6a8vjf6kj13','clr52oihv0018j61oeebirocd','retail'),('clr8vowjj000wj6a8kc79gu1r',1,'clqtaj3ux001cj6m8dyau3ic0','clr8pb2130002j6a8vjf6kj13','clqtjdw5w0037j6m88egxlokl','retail'),('clrd6mi9f0001j650378fjzn3',1,'clqtaeip4000sj6m873ixlu9x','clqv1x5tt0000j6p06u9r6l1d','clqtjd981002zj6m86xlf5qvs','retail'),('clrd6mkwu0002j6509d3lfge7',1,'clqtaeip4000sj6m873ixlu9x','clqv1x5tt0000j6p06u9r6l1d','clqtjd98a0031j6m821pgawa4','retail');
/*!40000 ALTER TABLE `cartproduct` ENABLE KEYS */;
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
