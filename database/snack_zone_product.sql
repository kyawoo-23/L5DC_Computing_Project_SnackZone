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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductPrimaryImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductWeight` double NOT NULL,
  `ProductPrice` double DEFAULT NULL,
  `WholesalePrice` double DEFAULT NULL,
  `ProductPackingQuantity` int NOT NULL,
  `IsPromotion` int NOT NULL DEFAULT '0',
  `PromotionPrice` double DEFAULT NULL,
  `IsFeatured` int NOT NULL DEFAULT '0',
  `SupplierId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CategoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ProductId`),
  KEY `Product_SupplierId_fkey` (`SupplierId`),
  KEY `Product_CategoryId_fkey` (`CategoryId`),
  CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_SupplierId_fkey` FOREIGN KEY (`SupplierId`) REFERENCES `supplier` (`SupplierId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('clqtac8t8000lj6m8vxc7wfe7','Gussen','Gussen wafers are made from 29% wheat, 29% sugar, and 20% vegetable fat. They are rich in flavor and aroma, and can be enjoyed by both children and adults.\r\n','https://utfs.io/f/15dc0787-5f36-487d-8780-01a5e3523414-6bzqxo.jpg',264,12,11,12,0,NULL,0,'clqt9kcod0001j6m8yc99ul50','clqta4d0m000jj6m80oivcjun',1),('clqtaeip4000sj6m873ixlu9x','Beauty Jelly','Jele Beautie is a jelly drink that contains fruit juice, vitamins, and collagen. It is a popular jelly drink in Southeast Asia and is considered a treat for the whole family, especially kids.','https://utfs.io/f/7bada940-74c7-4b32-89ea-b29366903ee0-3vg9u0.webp',150,4,3,12,0,NULL,0,'clqt9kqz90002j6m8owohv25l','clqta3qqg000hj6m88q387xjp',1),('clqtahbbl0019j6m8duby2oy3','Ovaltine Cookie','Ovaltine cookies are a nutritious snack made with malted barley, milk, and vitamins and minerals.','https://utfs.io/f/2402ed33-7ed9-42df-b48e-0908226ecc9a-6s3p6m.webp',360,12,11,12,0,NULL,0,'clqt9j9l40000j6m8c1ue3t2p','clqta429v000ij6m8ghu2huki',1),('clqtaj3ux001cj6m8dyau3ic0','Euro Cake','Euro Cake is a brand of custard cream cake made in Thailand. The cakes are soft and mild, and contain sweet custard.','https://utfs.io/f/ee869da7-db2e-4a6d-bc46-f5e9815e5705-knxwks.jpg',143,10,8,12,0,NULL,1,'clqt9kcod0001j6m8yc99ul50','clqt9zd9q000gj6m8vah6s0q1',1),('clqtaog6i001nj6m8x913ibpd','Fudo Cake','Fudo Cake is a soft and sweet layer cake that contains wheat flour, eggs, sugar, shortening, milk powder, baking powder, potassium sorbate, pandan flavor, and artificial color. ','https://utfs.io/f/1ceff247-2ac9-4fc5-841a-acf6e127034c-ia0lhu.jpg',432,10,9,12,0,NULL,1,'clqtalmvm001mj6m8zys2j860','clqt9zd9q000gj6m8vah6s0q1',1),('clqz6vhlx0009j640i4edescj','Yum Yum Cup Noodles','The delicious taste of sweet by shrimp, and fresh and clean ingredients with sour and chili flavour in Tom Yum soup like real Tom Yum style.','https://utfs.io/f/fbcb78d0-43c4-4e7d-93e9-7878eac0e173-9wvt75.jpg',360,33,31,6,1,31,0,'clqz0zttw0001j6405s7i8uhb','clqz1ry9e0002j640kp4g217n',1),('clr27yx420008j66ky2c7ce5m','Julie\'s Cracker Biscuit','Julie\'s Butter Crackers are flaky crackers with a subtle, fragrant butter taste that can be eaten on their own or with a light sweet or salty topping.\r\n','https://utfs.io/f/3519721f-2293-47c0-8443-ee320550dc0d-xr7vsr.webp',250,25,23,24,1,22,1,'clr26ntv00000j66k0u0lzwia','clr270ueh0001j66k39h916rb',1),('clr52b7450004j61o8lv712yz','Dewberry Cake','Dewberry Cake is made up of a soft and smooth texture with a rich cream filling. ','https://utfs.io/f/5c21d416-a395-45a3-9662-ae826f2c1701-3zje67.jpeg',330,20,18,12,0,NULL,0,'clqt9mrte0004j6m8r2fh0gy5','clqt9zd9q000gj6m8vah6s0q1',1),('clr52fvzv000dj61ontfk1q08','Dewberry Cookie','Dewberry cookies are bite-sized cookies with a combination of crunchy, buttery biscuits, smooth cream filling, and a fruity jam center.','https://utfs.io/f/fca1b4f1-476d-4fa9-b971-170d6fda19d9-bye0ec.jpg',432,22,20,12,0,NULL,1,'clqt9mrte0004j6m8r2fh0gy5','clqta429v000ij6m8ghu2huki',1),('clr52huyw000lj61o058vtsu0','Cream-O Plus','Jack \'n Jill Cream-O-Vanilla Sandwich Cookies are melt-in-your-mouth cookies with a creamy vanilla filling.','https://utfs.io/f/27b6db15-cb9d-4b8a-9fcf-d40c90e55ec7-l96jnd.webp',432,22,20,12,1,20,0,'clqt9mrte0004j6m8r2fh0gy5','clqta429v000ij6m8ghu2huki',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
