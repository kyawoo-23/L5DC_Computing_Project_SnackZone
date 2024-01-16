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
-- Table structure for table `productimage`
--

DROP TABLE IF EXISTS `productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimage` (
  `ProductImagesId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ProductImagesId`),
  KEY `ProductImage_ProductId_fkey` (`ProductId`),
  CONSTRAINT `ProductImage_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimage`
--

LOCK TABLES `productimage` WRITE;
/*!40000 ALTER TABLE `productimage` DISABLE KEYS */;
INSERT INTO `productimage` VALUES ('clqtaccqe000pj6m8qswvl8np','clqtac8t8000lj6m8vxc7wfe7','https://utfs.io/f/bd8e6e07-3578-492f-94f1-51af32c3d8cf-6bzqxm.jpg'),('clqtaccqt000qj6m8npeufepd','clqtac8t8000lj6m8vxc7wfe7','https://utfs.io/f/e9960a6b-8c30-4654-9d3f-a0959db9535b-6bzqxn.jpg'),('clqtaen15000wj6m8vtyp1rf6','clqtaeip4000sj6m873ixlu9x','https://utfs.io/f/1d20ccfa-3814-46ec-b1d8-d0a0f9e130ba-3vg9u3.jpg'),('clqtaen1b000xj6m8im1sqlta','clqtaeip4000sj6m873ixlu9x','https://utfs.io/f/9025b6d9-0e04-40a3-917e-84c5ab4c0d5d-3vg9u2.png'),('clqtaen1g000yj6m85idlq1km','clqtaeip4000sj6m873ixlu9x','https://utfs.io/f/7f1c7217-655c-4124-9597-9e67180c6581-3vg9u1.webp'),('clqtaen1j000zj6m8v571yb78','clqtaeip4000sj6m873ixlu9x','https://utfs.io/f/a0e2d4b6-f2bb-477e-8550-35ba3625a7c3-3vg9tz.avif'),('clqtaen1m0010j6m8j5bv7zx7','clqtaeip4000sj6m873ixlu9x','https://utfs.io/f/90c6537f-35a4-4c2a-a33b-b5e21b92342d-3vg9ty.jpg'),('clqtahdux001bj6m80xkgmwad','clqtahbbl0019j6m8duby2oy3','https://utfs.io/f/b3df43b7-281a-4689-bde8-798f4f7fc95b-2w5h70.jpeg'),('clqtaj7g9001ij6m85zter60b','clqtaj3ux001cj6m8dyau3ic0','https://utfs.io/f/b2ff370e-0801-4e70-a96d-147ca05f8dcf-knxwkt.jpg'),('clqtaj7gf001jj6m8hxtemw6t','clqtaj3ux001cj6m8dyau3ic0','https://utfs.io/f/20783e0f-e6cd-4b4b-aa71-b80e6b055da5-knxwku.webp'),('clqtaj7gj001kj6m82wnn2iu2','clqtaj3ux001cj6m8dyau3ic0','https://utfs.io/f/69fb290f-1f72-4d2d-ac32-161250d3e671-knxwkv.webp'),('clqtaj7gm001lj6m8nbqdc7wd','clqtaj3ux001cj6m8dyau3ic0','https://utfs.io/f/bc7abf7f-37e1-44bb-b5c9-365055f992d1-knxwkw.jpg'),('clqtaokcx001sj6m8owyy1g21','clqtaog6i001nj6m8x913ibpd','https://utfs.io/f/328285e5-1845-440b-9443-8a59046e1e26-1mdxep.webp'),('clqtaokd5001tj6m8ev5t0rip','clqtaog6i001nj6m8x913ibpd','https://utfs.io/f/b67e07ac-0373-426e-abd9-58a653331398-1mdxeo.png'),('clqtaokd9001uj6m8b75isjw5','clqtaog6i001nj6m8x913ibpd','https://utfs.io/f/1c403963-dfbb-442a-a7fc-a156f200f821-1mdxen.webp'),('clqz6vmj1000ej6407v1sn7op','clqz6vhlx0009j640i4edescj','https://utfs.io/f/7fc4733c-e56c-478b-81d0-418561c3370a-n6xx7h.webp'),('clqz6vmj9000fj640b94iwey9','clqz6vhlx0009j640i4edescj','https://utfs.io/f/daa2c072-8f2d-45ce-867e-1272c0cba340-n6xx7g.jpeg'),('clqz6vmjc000gj640c2zkaqkq','clqz6vhlx0009j640i4edescj','https://utfs.io/f/1b6f5fb8-667d-44c5-86b4-d51d10b46bd5-n6xx7f.jpeg'),('clr27z0ez000cj66kgn0qhuh0','clr27yx420008j66ky2c7ce5m','https://utfs.io/f/c8579bd2-39e4-46be-90db-6b112fb22abe-e24ezu.webp'),('clr27z0fd000dj66kdz4r68g4','clr27yx420008j66ky2c7ce5m','https://utfs.io/f/d54f449b-1909-4e92-8d1a-060c8b13fc05-qqrs5b.avif'),('clr52basg0009j61ooxac9vc9','clr52b7450004j61o8lv712yz','https://utfs.io/f/7b053a86-132e-439c-8efc-ccfca68c0e56-twntoi.jpeg'),('clr52batb000aj61ooeznush7','clr52b7450004j61o8lv712yz','https://utfs.io/f/46eeeeb1-8586-4f75-b474-027a7a28ebb8-3vf5u3.jpeg'),('clr52bati000bj61od7xg6ozp','clr52b7450004j61o8lv712yz','https://utfs.io/f/65f463ea-2d6c-49fc-b86a-9accb8685bb6-ke3ktm.jpeg'),('clr52g0kg000ij61ogsx65863','clr52fvzv000dj61ontfk1q08','https://utfs.io/f/e54e9236-1f41-46fa-aede-c92d4fd72dcf-r80ncf.webp'),('clr52g0kn000jj61oybx8m7ag','clr52fvzv000dj61ontfk1q08','https://utfs.io/f/90fdcd60-dc33-4a77-9bc3-b1c8c4505697-o28j3u.webp'),('clr52g0kt000kj61oyqq4u2gm','clr52fvzv000dj61ontfk1q08','https://utfs.io/f/a4ebc743-ce85-47c7-b2ab-c04ebd74ab66-7l14hu.webp'),('clr52i0b6000qj61oka1edeln','clr52huyw000lj61o058vtsu0','https://utfs.io/f/d95761f3-9070-4cfa-881a-e6b349a11b10-z48qzd.webp'),('clr52i0bz000rj61o834myu5e','clr52huyw000lj61o058vtsu0','https://utfs.io/f/324c106b-7249-4630-a9e7-89297a2336c9-eujs2z.jpg'),('clr52i0c5000sj61odr55qzx4','clr52huyw000lj61o058vtsu0','https://utfs.io/f/aeb9dda3-f612-4e05-befe-77c3e7d85852-fp5ic1.jpg');
/*!40000 ALTER TABLE `productimage` ENABLE KEYS */;
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
