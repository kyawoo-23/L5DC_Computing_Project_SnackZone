/*
  Warnings:

  - Added the required column `PurchaseType` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartproduct` ADD COLUMN `PurchaseType` VARCHAR(191) NOT NULL;
