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
-- Table structure for table `purchaseproduct`
--

DROP TABLE IF EXISTS `purchaseproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchaseproduct` (
  `PurchaseProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PurchaseAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PurchaseQuantity` int NOT NULL,
  `OriginalPrice` double NOT NULL,
  `ExpiryDate` datetime(3) NOT NULL,
  `AdminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductStock` int NOT NULL,
  `VariantName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`PurchaseProductId`),
  KEY `PurchaseProduct_ProductId_fkey` (`ProductId`),
  KEY `PurchaseProduct_AdminId_fkey` (`AdminId`),
  CONSTRAINT `PurchaseProduct_AdminId_fkey` FOREIGN KEY (`AdminId`) REFERENCES `admin` (`AdminId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `PurchaseProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseproduct`
--

LOCK TABLES `purchaseproduct` WRITE;
/*!40000 ALTER TABLE `purchaseproduct` DISABLE KEYS */;
INSERT INTO `purchaseproduct` VALUES ('clq2imqer0000j6qogj9wtlw7','2023-12-12 15:46:52.851','clqz6vhlx0009j640i4edescj',30,28,'2024-06-12 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',30,'Spicy'),('clqtkfhvp0002j6rghdk4xfka','2023-12-31 14:07:01.189','clqtac8t8000lj6m8vxc7wfe7',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Milk'),('clqtkgzdi000fj6rgx9p41oes','2023-12-31 14:08:10.519','clqtac8t8000lj6m8vxc7wfe7',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Strawberry'),('clqtkhatc000gj6rg73mxev2u','2023-12-31 14:08:25.344','clqtac8t8000lj6m8vxc7wfe7',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Chocolate'),('clqtkhr30000hj6rgw49v8hn0','2023-12-31 14:08:46.428','clqtaeip4000sj6m873ixlu9x',24,2,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Strawberry'),('clqtki3hc000ij6rgty9l4uuj','2023-12-31 14:09:02.496','clqtaeip4000sj6m873ixlu9x',24,2,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Black currant'),('clqtkicwo000jj6rgktuoe19q','2023-12-31 14:09:14.712','clqtaeip4000sj6m873ixlu9x',24,2,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Grape'),('clqtkimic000kj6rg56mna2k1','2023-12-31 14:09:27.156','clqtaeip4000sj6m873ixlu9x',24,2,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Apple'),('clqtkiw0v000lj6rg220q8p42','2023-12-31 14:09:39.487','clqtaeip4000sj6m873ixlu9x',24,2,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Lemon'),('clqtkj7u8000mj6rg9iabkj0a','2023-12-31 14:09:54.800','clqtahbbl0019j6m8duby2oy3',24,10,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',12,'Original'),('clqtkjhly000nj6rgkqt3rdz7','2023-12-31 14:10:07.462','clqtaj3ux001cj6m8dyau3ic0',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Milk'),('clqtkjruh000oj6rg1fldr2n6','2023-12-31 14:10:20.730','clqtaj3ux001cj6m8dyau3ic0',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',10,'Strawberry'),('clqtkk22m000pj6rgxow2iq4h','2023-12-31 14:10:33.982','clqtaj3ux001cj6m8dyau3ic0',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Chocolate'),('clqtkkcg5000qj6rge2in2n2h','2023-12-31 14:10:47.430','clqtaj3ux001cj6m8dyau3ic0',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Cappuccino'),('clqtkko7h000rj6rg2n721ajv','2023-12-31 14:11:02.669','clqtaog6i001nj6m8x913ibpd',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Strawberry'),('clqtkkxmn000sj6rglx2mslin','2023-12-31 14:11:14.879','clqtaog6i001nj6m8x913ibpd',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Banana'),('clqtkl7cy000tj6rgzzeh0pe5','2023-12-31 14:11:27.490','clqtaog6i001nj6m8x913ibpd',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Chocolate'),('clqtklgtx000uj6rgyvxda8yb','2023-12-31 14:11:39.765','clqtaog6i001nj6m8x913ibpd',24,8,'2024-12-31 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Pandan'),('clr28h282000kj66kjxt7q3p0','2024-01-06 15:42:14.402','clr27yx420008j66ky2c7ce5m',24,20,'2025-01-06 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Butter'),('clr52j3l7000tj61o6q9tfthr','2024-01-08 15:19:10.315','clr27yx420008j66ky2c7ce5m',24,20,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Lemon'),('clr52jf3n000uj61osqz57633','2024-01-08 15:19:25.235','clr27yx420008j66ky2c7ce5m',24,20,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Cheese'),('clr52jyos000vj61oe4jizi0x','2024-01-08 15:19:50.620','clr52b7450004j61o8lv712yz',24,15,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Strawberry'),('clr52k8ey000wj61o3wjvxsb0','2024-01-08 15:20:03.227','clr52b7450004j61o8lv712yz',24,15,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',22,'Blueberry'),('clr52kme5000xj61o81375eyk','2024-01-08 15:20:21.342','clr52b7450004j61o8lv712yz',24,15,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Lemon'),('clr52ky61000yj61oa0laslho','2024-01-08 15:20:36.601','clr52b7450004j61o8lv712yz',24,15,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Orange'),('clr52l952000zj61o6ednv339','2024-01-08 15:20:50.822','clr52fvzv000dj61ontfk1q08',24,18,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Strawberry'),('clr52lift0010j61od1hmlajm','2024-01-08 15:21:02.874','clr52fvzv000dj61ontfk1q08',24,18,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Cherry'),('clr52ltie0011j61obwvb89aj','2024-01-08 15:21:17.222','clr52fvzv000dj61ontfk1q08',24,15,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Blueberry'),('clr52m4aa0012j61om0lkr9nk','2024-01-08 15:21:31.186','clr52fvzv000dj61ontfk1q08',24,18,'2024-07-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',24,'Grape'),('clr52mhi40013j61ovhy9jmwg','2024-01-08 15:21:48.316','clr52huyw000lj61o058vtsu0',12,18,'2025-01-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',12,'Caramel'),('clr52mrmb0014j61om0hex2wu','2024-01-08 15:22:01.428','clr52huyw000lj61o058vtsu0',12,18,'2025-01-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',12,'Strawberry'),('clr52n2gc0015j61os214q5qe','2024-01-08 15:22:15.469','clr52huyw000lj61o058vtsu0',12,18,'2025-01-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',12,'Chocolate'),('clr52nc1z0016j61oyd6lpgyk','2024-01-08 15:22:27.911','clr52huyw000lj61o058vtsu0',12,18,'2025-01-08 00:00:00.000','clqqorxhg0002j6r03lfbhlwy',12,'Coconut');
/*!40000 ALTER TABLE `purchaseproduct` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 20:15:02
