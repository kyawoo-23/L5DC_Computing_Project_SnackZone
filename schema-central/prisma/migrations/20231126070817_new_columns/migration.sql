-- AlterTable
ALTER TABLE `category` ADD COLUMN `CategoryImage` VARCHAR(191) NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true;
