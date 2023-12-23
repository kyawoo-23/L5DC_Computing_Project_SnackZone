/*
  Warnings:

  - You are about to drop the `productstock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ProductStock` to the `PurchaseProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productstock` DROP FOREIGN KEY `ProductStock_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `productstock` DROP FOREIGN KEY `ProductStock_ProductVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `productstock` DROP FOREIGN KEY `ProductStock_PurchaseProductId_fkey`;

-- AlterTable
ALTER TABLE `purchaseproduct` ADD COLUMN `ProductStock` INTEGER NOT NULL;

-- DropTable
DROP TABLE `productstock`;
