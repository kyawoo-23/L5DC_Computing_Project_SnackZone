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
-- Table structure for table `customerorder`
--

DROP TABLE IF EXISTS `customerorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerorder` (
  `CustomerOrderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `OrderCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `OrderStatus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `TotalPrice` double NOT NULL,
  `IsPrepaid` int NOT NULL,
  `PrepaidVoucherImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AssignedAdminId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DeliveryServiceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `OrderAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `AcceptedAt` datetime(3) DEFAULT NULL,
  `DeliveredAt` datetime(3) DEFAULT NULL,
  `CustomerAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`CustomerOrderId`),
  UNIQUE KEY `CustomerOrder_OrderCode_key` (`OrderCode`),
  KEY `CustomerOrder_AssignedAdminId_fkey` (`AssignedAdminId`),
  KEY `CustomerOrder_DeliveryServiceId_fkey` (`DeliveryServiceId`),
  KEY `CustomerOrder_CustomerId_fkey` (`CustomerId`),
  CONSTRAINT `CustomerOrder_AssignedAdminId_fkey` FOREIGN KEY (`AssignedAdminId`) REFERENCES `admin` (`AdminId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CustomerOrder_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CustomerOrder_DeliveryServiceId_fkey` FOREIGN KEY (`DeliveryServiceId`) REFERENCES `deliveryservice` (`DeliveryServiceId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerorder`
--

LOCK TABLES `customerorder` WRITE;
/*!40000 ALTER TABLE `customerorder` DISABLE KEYS */;
INSERT INTO `customerorder` VALUES ('clpi5tzul0001j6fwb681e5yf','A1QD','Cancelled',34,0,NULL,'clqynle9e0000j640j8imsvaq',NULL,'clr1nicfn0006j6q819jnkut0','2023-11-28 09:53:13.149',NULL,NULL,'Mandalay, Myanmar','095252672281'),('clpi62bym0005j6fwtg7urhcv','KBYL','Pending',22,0,NULL,NULL,NULL,'clr1nicfn0006j6q819jnkut0','2023-11-28 09:59:42.094',NULL,NULL,'Mandalay, Myanmar','095252672281'),('clpi62rvp000aj6fwit2isujp','U0G4','Pending',40,1,'https://utfs.io/f/e42fd9f5-bcce-4957-8383-a63ceb67a205-zf6gih.jpg',NULL,NULL,'clr1nicfn0006j6q819jnkut0','2023-11-28 10:00:02.726',NULL,NULL,'Mandalay, Myanmar','095252672281'),('clpi637mx000gj6fwlyyyfyjo','JLLE','Completed',142,0,NULL,'clqqorxhg0002j6r03lfbhlwy','clqt9t27f000ej6m85qj7hbdf','clr1nicfn0006j6q819jnkut0','2023-11-28 10:00:23.145','2023-11-28 10:16:11.840','2023-11-28 10:17:32.524','Mandalay, Myanmar','095252672281'),('clpi63pgf000kj6fwa53lr3eq','ZVH3','Cancelled',50,1,'https://utfs.io/f/7ac3c99d-5acb-4f76-beb9-b524b8e396dc-zf6gih.jpg','clqynle9e0000j640j8imsvaq','clqt9t27f000ej6m85qj7hbdf','clr1nicfn0006j6q819jnkut0','2023-11-28 10:00:46.240','2023-11-28 10:10:39.942',NULL,'Mandalay, Myanmar','095252672281'),('clqv249pa0004j6p0sweokbsv','OXSG','Processing',20,0,NULL,'clqqorxhg0002j6r03lfbhlwy','clqt9t27f000ej6m85qj7hbdf','clqv1x5tt0000j6p06u9r6l1d','2024-01-01 15:09:56.638','2024-01-02 16:19:59.960',NULL,'Lanmadaw, Yangon','09795559054'),('clr1n85dz0001j6q8vj9vd7tz','4JPA','Cancelled',82,0,NULL,'clqynle9e0000j640j8imsvaq',NULL,'clqv1x5tt0000j6p06u9r6l1d','2024-01-06 05:47:26.664',NULL,NULL,'Lanmadaw, Yangon','09795559054'),('clr1np5fb0008j6q8ppd0yiyy','YMQW','Completed',46,1,'https://utfs.io/f/206238e5-6230-499d-afa2-5cf8cdf8cbf5-zf6gih.jpg','clqynle9e0000j640j8imsvaq','clqz2uabi0004j640h32oug2y','clr1nicfn0006j6q819jnkut0','2024-01-06 06:00:39.860','2024-01-06 06:01:07.009','2024-01-06 06:01:13.449','Mandalay, Myanmar','095252672281'),('clr1ntrpu000cj6q8s6mcs5p2','S4UK','Completed',106,1,'https://utfs.io/f/c1b34f01-6e15-4235-9a6c-965a9757dee9-zf6gih.jpg','clqynle9e0000j640j8imsvaq','clqz2uabi0004j640h32oug2y','clr1nicfn0006j6q819jnkut0','2024-01-06 06:04:15.378','2024-01-06 06:04:31.184','2024-01-06 06:04:33.613','Mandalay, Myanmar','095252672281'),('clr1nx812000gj6q84coewv8l','RHA0','Cancelled',2170,0,NULL,'clqynle9e0000j640j8imsvaq',NULL,'clr1nicfn0006j6q819jnkut0','2024-01-06 06:06:56.486',NULL,NULL,'Mandalay, Myanmar','095252672281'),('clr28ni900002j6rspgf4pabl','X8U5','Cancelled',76,0,NULL,'clqqorxhg0002j6r03lfbhlwy','clr2772sc0002j66kjc0f2ckm','clqv1x5tt0000j6p06u9r6l1d','2024-01-06 15:47:15.108','2024-01-06 15:55:01.635',NULL,'Lanmadaw, Yangon','09795559054'),('clr28ohoj0008j6rs4ikr4na7','PGOB','Cancelled',2650,0,NULL,'clqqorxhg0002j6r03lfbhlwy',NULL,'clqv1x5tt0000j6p06u9r6l1d','2024-01-06 15:48:01.028',NULL,NULL,'Lanmadaw, Yangon','09795559054'),('clr28oqqq000cj6rs53p2acli','UOYN','Completed',30,0,NULL,'clr27ga2p0004j66kn8ujaxry','clr2772sc0002j66kjc0f2ckm','clqv1x5tt0000j6p06u9r6l1d','2024-01-06 15:48:12.770','2024-01-06 15:56:33.932','2024-01-06 15:57:37.439','Lanmadaw, Yangon','09795559054'),('clr28p6o3000hj6rsvsln7rns','R6N7','Processing',101,0,NULL,'clr27ga2p0004j66kn8ujaxry','clqt9tfbc000fj6m8rfqoobzc','clqv1x5tt0000j6p06u9r6l1d','2024-01-06 15:48:33.411','2024-01-06 16:00:01.904',NULL,'Lanmadaw, Yangon','09795559054'),('clr28spdg000nj6rs5u6op0k5','FS6F','Cancelled',34,0,NULL,'clqqorxhg0002j6r03lfbhlwy',NULL,'clqv1x5tt0000j6p06u9r6l1d','2024-01-06 15:51:17.621',NULL,NULL,'Lanmadaw, Yangon','09795559054'),('clr8v1qsb000kj6a8aix2294b','EDTH','Cancelled',30,1,'https://utfs.io/f/c9483ecc-f4b2-42b7-a506-bb2ea72fad06-zf6gih.jpg','clqqorxhg0002j6r03lfbhlwy','clqt9t27f000ej6m85qj7hbdf','clr8pb2130002j6a8vjf6kj13','2023-12-12 07:00:47.953','2024-01-11 07:10:05.472',NULL,'No. 22, Lanmadaw, Yangon','09795559054'),('clr8vhgvo000oj6a8p0o6qzhv','D82N','Cancelled',50,1,'https://utfs.io/f/f2c90d57-ba49-4140-92a1-9348fdcb85f4-zf6gih.jpg','clqqorxhg0002j6r03lfbhlwy',NULL,'clr8pb2130002j6a8vjf6kj13','2023-12-12 07:13:01.621',NULL,NULL,'No. 22, Lanmadaw, Yangon','09795559054'),('clr8vivqd000sj6a85m6ho67j','VOPR','Completed',50,1,'https://utfs.io/f/c5253dfe-af78-4fdf-bfe4-dd4141df270e-zf6gih.jpg','clqqorxhg0002j6r03lfbhlwy','clqt9t27f000ej6m85qj7hbdf','clr8pb2130002j6a8vjf6kj13','2023-12-12 07:14:07.525','2023-12-12 07:14:40.210','2023-12-12 07:14:43.493','No. 22, Lanmadaw, Yangon','09795559054'),('clr9ar2lh0004j6qoud9uzyz7','UHPE','Pending',294,1,'https://utfs.io/f/c1759ff8-dc97-4be4-96bd-b1ccdef92fe3-zf6gih.jpg',NULL,NULL,'clr98x6l90000j6qo2a2thymg','2024-01-11 14:20:23.908',NULL,NULL,'No. 22, Lanmadaw, Yangon','09795559054');
/*!40000 ALTER TABLE `customerorder` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 20:15:01
