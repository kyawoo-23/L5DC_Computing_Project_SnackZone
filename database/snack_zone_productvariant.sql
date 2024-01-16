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
-- Table structure for table `productvariant`
--

DROP TABLE IF EXISTS `productvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productvariant` (
  `ProductVariantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VariantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ProductVariantId`),
  KEY `ProductVariant_ProductId_fkey` (`ProductId`),
  KEY `ProductVariant_VariantId_fkey` (`VariantId`),
  CONSTRAINT `ProductVariant_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductVariant_VariantId_fkey` FOREIGN KEY (`VariantId`) REFERENCES `variant` (`VariantId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvariant`
--

LOCK TABLES `productvariant` WRITE;
/*!40000 ALTER TABLE `productvariant` DISABLE KEYS */;
INSERT INTO `productvariant` VALUES ('clqtjd981002zj6m86xlf5qvs','clqtaeip4000sj6m873ixlu9x','clqt9o3vt0007j6m88jqqly4z'),('clqtjd9870030j6m8j2ml8hhs','clqtaeip4000sj6m873ixlu9x','clqtafi9q0012j6m8cti5jh7l'),('clqtjd98a0031j6m821pgawa4','clqtaeip4000sj6m873ixlu9x','clqtafpbw0013j6m8k67nhe9y'),('clqtjd98e0032j6m8ax8ubfjn','clqtaeip4000sj6m873ixlu9x','clqt9peem000bj6m8whbzydzf'),('clqtjd98h0033j6m84nxwbd7l','clqtaeip4000sj6m873ixlu9x','clqtaf8uo0011j6m8oyl6jrpc'),('clqtjdie20034j6m8jetojfti','clqtahbbl0019j6m8duby2oy3','clqt9nmyo0005j6m8vja09v0f'),('clqtjdw5o0035j6m8e9orb62f','clqtaj3ux001cj6m8dyau3ic0','clqt9nuse0006j6m82k2xjlw5'),('clqtjdw5t0036j6m8kuyyok0p','clqtaj3ux001cj6m8dyau3ic0','clqt9o3vt0007j6m88jqqly4z'),('clqtjdw5w0037j6m88egxlokl','clqtaj3ux001cj6m8dyau3ic0','clqt9px7t000cj6m887m6nbtz'),('clqtjdw5z0038j6m85wci5nrg','clqtaj3ux001cj6m8dyau3ic0','clqt9qo0t000dj6m8sm5kvgdc'),('clqtjedzr0039j6m8p1euvyqi','clqtaog6i001nj6m8x913ibpd','clqt9o3vt0007j6m88jqqly4z'),('clqtjedzv003aj6m8j0t80wjq','clqtaog6i001nj6m8x913ibpd','clqt9odce0008j6m80wlkiw13'),('clqtjedzz003bj6m8omv4jubh','clqtaog6i001nj6m8x913ibpd','clqt9px7t000cj6m887m6nbtz'),('clqtjee02003cj6m8pezghfdg','clqtaog6i001nj6m8x913ibpd','clqt9orxl0009j6m86g8vrus4'),('clqtkgm7p000cj6rg2phukd7i','clqtac8t8000lj6m8vxc7wfe7','clqt9nuse0006j6m82k2xjlw5'),('clqtkgm7t000dj6rgv5ndmttu','clqtac8t8000lj6m8vxc7wfe7','clqt9o3vt0007j6m88jqqly4z'),('clqtkgm7w000ej6rgraadth6n','clqtac8t8000lj6m8vxc7wfe7','clqt9px7t000cj6m887m6nbtz'),('clqz7tudf000pj64020ivi223','clqz6vhlx0009j640i4edescj','clqz2agjd0003j640meym82uz'),('clqz7tudk000qj640zw5r7lb0','clqz6vhlx0009j640i4edescj','clqz6jq9x0008j640ptmgsut7'),('clqz7tudo000rj640mr51c9dm','clqz6vhlx0009j640i4edescj','clqz6j4uz0006j640mzipsymf'),('clqz7tudr000sj640r3aywn1c','clqz6vhlx0009j640i4edescj','clqz6jf9a0007j640uk63b6mv'),('clr28963g000hj66keqzgepl1','clr27yx420008j66ky2c7ce5m','clr27c3bc0003j66knw0ktrdg'),('clr28963k000ij66kxtnvd88x','clr27yx420008j66ky2c7ce5m','clqtaf8uo0011j6m8oyl6jrpc'),('clr28963n000jj66k16hn0dyx','clr27yx420008j66ky2c7ce5m','clr27qhek0007j66kqhq21ly4'),('clr52oihr0017j61odh7f9qbs','clr52b7450004j61o8lv712yz','clqt9o3vt0007j6m88jqqly4z'),('clr52oihv0018j61oeebirocd','clr52b7450004j61o8lv712yz','clr5288370003j61o2d5kcsot'),('clr52oii00019j61ojvb66zgc','clr52b7450004j61o8lv712yz','clqtaf8uo0011j6m8oyl6jrpc'),('clr52oii3001aj61o43w4abe8','clr52b7450004j61o8lv712yz','clr526rfl0000j61oi94kw8hh'),('clr52oz5q001bj61o98xjwx1o','clr52fvzv000dj61ontfk1q08','clqt9o3vt0007j6m88jqqly4z'),('clr52oz5t001cj61ocp06h2tn','clr52fvzv000dj61ontfk1q08','clqt9p2qq000aj6m8wa7f8btd'),('clr52oz5x001dj61olkt1jq03','clr52fvzv000dj61ontfk1q08','clr5288370003j61o2d5kcsot'),('clr52oz64001ej61oyie612ix','clr52fvzv000dj61ontfk1q08','clqtafpbw0013j6m8k67nhe9y'),('clr52pqmj001fj61ob0r252ve','clr52huyw000lj61o058vtsu0','clr527piv0002j61o0git8efc'),('clr52pqmo001gj61ocq7r5yj1','clr52huyw000lj61o058vtsu0','clqt9o3vt0007j6m88jqqly4z'),('clr52pqmr001hj61omrpab1j6','clr52huyw000lj61o058vtsu0','clqt9px7t000cj6m887m6nbtz'),('clr52pqmv001ij61oxbueymiu','clr52huyw000lj61o058vtsu0','clr527b440001j61o80zeydzs');
/*!40000 ALTER TABLE `productvariant` ENABLE KEYS */;
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
