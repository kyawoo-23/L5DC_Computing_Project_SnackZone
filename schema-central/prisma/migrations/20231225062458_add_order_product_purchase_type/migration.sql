/*
  Warnings:

  - Added the required column `PurchaseType` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderproduct` ADD COLUMN `PurchaseType` VARCHAR(191) NOT NULL;
