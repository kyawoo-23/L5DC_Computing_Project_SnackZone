/*
  Warnings:

  - Made the column `CategoryImage` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `SupplierImage` on table `supplier` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `CategoryImage` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `supplier` MODIFY `SupplierImage` VARCHAR(191) NOT NULL;
