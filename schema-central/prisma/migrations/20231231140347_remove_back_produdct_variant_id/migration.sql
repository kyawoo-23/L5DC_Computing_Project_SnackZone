/*
  Warnings:

  - You are about to drop the column `ProductVariantId` on the `purchaseproduct` table. All the data in the column will be lost.
  - Added the required column `VariantName` to the `PurchaseProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchaseproduct` DROP FOREIGN KEY `PurchaseProduct_ProductVariantId_fkey`;

-- AlterTable
ALTER TABLE `purchaseproduct` DROP COLUMN `ProductVariantId`,
    ADD COLUMN `VariantName` VARCHAR(191) NOT NULL;
