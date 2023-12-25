/*
  Warnings:

  - You are about to drop the `customerorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `customerorder` DROP FOREIGN KEY `CustomerOrder_AssignedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `customerorder` DROP FOREIGN KEY `CustomerOrder_CustomerId_fkey`;

-- DropForeignKey
ALTER TABLE `customerorder` DROP FOREIGN KEY `CustomerOrder_DeliveryServiceId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_CustomerOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_ProductId_fkey`;

-- DropTable
DROP TABLE `customerorder`;

-- DropTable
DROP TABLE `orderproduct`;
