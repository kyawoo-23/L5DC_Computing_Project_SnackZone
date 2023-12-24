/*
  Warnings:

  - You are about to drop the `wishlistproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wishlistproduct` DROP FOREIGN KEY `WishListProduct_CustomerId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlistproduct` DROP FOREIGN KEY `WishListProduct_ProductId_fkey`;

-- DropTable
DROP TABLE `wishlistproduct`;
