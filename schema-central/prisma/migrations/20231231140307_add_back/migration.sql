/*
  Warnings:

  - You are about to drop the column `VariantName` on the `purchaseproduct` table. All the data in the column will be lost.
  - Added the required column `ProductVariantId` to the `PurchaseProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchaseproduct` DROP COLUMN `VariantName`,
    ADD COLUMN `ProductVariantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PurchaseProduct` ADD CONSTRAINT `PurchaseProduct_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `ProductVariant`(`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;
