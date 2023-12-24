/*
  Warnings:

  - You are about to drop the column `ProductVariantId` on the `wishlistproduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `wishlistproduct` DROP FOREIGN KEY `WishListProduct_ProductVariantId_fkey`;

-- AlterTable
ALTER TABLE `wishlistproduct` DROP COLUMN `ProductVariantId`;
