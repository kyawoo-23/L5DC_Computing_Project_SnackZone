-- CreateTable
CREATE TABLE `DeliveryService` (
    `DeliveryServiceId` VARCHAR(191) NOT NULL,
    `DeliveryServiceName` VARCHAR(191) NOT NULL,
    `DeliveryServiceImage` VARCHAR(191) NOT NULL,
    `IsActive` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `DeliveryService_DeliveryServiceName_key`(`DeliveryServiceName`),
    PRIMARY KEY (`DeliveryServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
