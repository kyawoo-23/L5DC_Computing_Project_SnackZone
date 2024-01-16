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
-- Table structure for table `orderproduct`
--

DROP TABLE IF EXISTS `orderproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproduct` (
  `OrderProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VariantName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` int NOT NULL,
  `Price` double NOT NULL,
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerOrderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PurchaseType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`OrderProductId`),
  KEY `OrderProduct_ProductId_fkey` (`ProductId`),
  KEY `OrderProduct_CustomerOrderId_fkey` (`CustomerOrderId`),
  CONSTRAINT `OrderProduct_CustomerOrderId_fkey` FOREIGN KEY (`CustomerOrderId`) REFERENCES `customerorder` (`CustomerOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OrderProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproduct`
--

LOCK TABLES `orderproduct` WRITE;
/*!40000 ALTER TABLE `orderproduct` DISABLE KEYS */;
INSERT INTO `orderproduct` VALUES ('clpi5tzuy0003j6fwpxcdmss5','Ovaltine Cookie','Original',2,12,'clqtahbbl0019j6m8duby2oy3','clpi5tzul0001j6fwb681e5yf','retail'),('clpi62byy0007j6fwm63ucbty','Gussen','Strawberry',1,12,'clqtac8t8000lj6m8vxc7wfe7','clpi62bym0005j6fwtg7urhcv','retail'),('clpi62v81000cj6fwdgnjuflv','Fudo Cake','Banana',2,10,'clqtaog6i001nj6m8x913ibpd','clpi62rvp000aj6fwit2isujp','retail'),('clpi62v84000ej6fwna9co05v','Fudo Cake','Strawberry',1,10,'clqtaog6i001nj6m8x913ibpd','clpi62rvp000aj6fwit2isujp','retail'),('clpi637n5000ij6fwvb2yovva','Ovaltine Cookie','Original',1,11,'clqtahbbl0019j6m8duby2oy3','clpi637mx000gj6fwlyyyfyjo','wholesale'),('clpi63t91000mj6fwnigc92pw','Euro Cake','Cappuccino',4,10,'clqtaj3ux001cj6m8dyau3ic0','clpi63pgf000kj6fwa53lr3eq','retail'),('clqv249pn0006j6p0wn2xhjdg','Euro Cake','Milk',1,10,'clqtaj3ux001cj6m8dyau3ic0','clqv249pa0004j6p0sweokbsv','retail'),('clr1n85eq0003j6q8l9d6yolg','Fudo Cake','Strawberry',1,10,'clqtaog6i001nj6m8x913ibpd','clr1n85dz0001j6q8vj9vd7tz','retail'),('clr1n85ex0005j6q8n5o4wy7d','Yum Yum Cup Noodles','Spicy',2,31,'clqz6vhlx0009j640i4edescj','clr1n85dz0001j6q8vj9vd7tz','retail'),('clr1np8yz000aj6q8kqgbu83e','Beauty Jelly','Strawberry',1,3,'clqtaeip4000sj6m873ixlu9x','clr1np5fb0008j6q8ppd0yiyy','wholesale'),('clr1ntvlf000ej6q8nd4wlvlq','Euro Cake','Strawberry',1,8,'clqtaj3ux001cj6m8dyau3ic0','clr1ntrpu000cj6q8s6mcs5p2','wholesale'),('clr1nx81b000ij6q82qo8cajx','Fudo Cake','Banana',20,9,'clqtaog6i001nj6m8x913ibpd','clr1nx812000gj6q84coewv8l','wholesale'),('clr28ni9b0004j6rs7ej8pije','Julie\'s Cracker Biscuit','Butter',2,22,'clr27yx420008j66ky2c7ce5m','clr28ni900002j6rspgf4pabl','retail'),('clr28ni9p0006j6rsp1a0qxrf','Julie\'s Cracker Biscuit','Cheese',1,22,'clr27yx420008j66ky2c7ce5m','clr28ni900002j6rspgf4pabl','retail'),('clr28ohor000aj6rs1kmyjzv1','Ovaltine Cookie','Original',20,11,'clqtahbbl0019j6m8duby2oy3','clr28ohoj0008j6rs4ikr4na7','wholesale'),('clr28oqqw000ej6rs8vi1e8u5','Euro Cake','Strawberry',2,10,'clqtaj3ux001cj6m8dyau3ic0','clr28oqqq000cj6rs53p2acli','retail'),('clr28p6ob000jj6rsoorrmyxz','Gussen','Chocolate',5,12,'clqtac8t8000lj6m8vxc7wfe7','clr28p6o3000hj6rsvsln7rns','retail'),('clr28p6od000lj6rs8zcjsoh0','Yum Yum Cup Noodles','Spicy',1,31,'clqz6vhlx0009j640i4edescj','clr28p6o3000hj6rsvsln7rns','retail'),('clr28spdo000pj6rs0mge9q2t','Beauty Jelly','Grape',6,4,'clqtaeip4000sj6m873ixlu9x','clr28spdg000nj6rs5u6op0k5','retail'),('clr8v1ue2000mj6a81uqf6j6q','Dewberry Cake','Strawberry',1,20,'clr52b7450004j61o8lv712yz','clr8v1qsb000kj6a8aix2294b','retail'),('clr8vhky1000qj6a83sicxz7r','Dewberry Cake','Blueberry',2,20,'clr52b7450004j61o8lv712yz','clr8vhgvo000oj6a8p0o6qzhv','retail'),('clr8viza4000uj6a8uaprjpq2','Dewberry Cake','Blueberry',2,20,'clr52b7450004j61o8lv712yz','clr8vivqd000sj6a85m6ho67j','retail'),('clr9ar65f0006j6qoeq0wub8g','Julie\'s Cracker Biscuit','Butter',2,22,'clr27yx420008j66ky2c7ce5m','clr9ar2lh0004j6qoud9uzyz7','retail'),('clr9ar65s0008j6qor76mcgyr','Dewberry Cookie','Blueberry',1,20,'clr52fvzv000dj61ontfk1q08','clr9ar2lh0004j6qoud9uzyz7','wholesale');
/*!40000 ALTER TABLE `orderproduct` ENABLE KEYS */;
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
