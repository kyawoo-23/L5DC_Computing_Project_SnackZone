-- CreateTable
CREATE TABLE `CustomerOrder` (
    `CustomerOrderId` VARCHAR(191) NOT NULL,
    `OrderCode` VARCHAR(191) NOT NULL,
    `OrderStatus` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `TotalPrice` DOUBLE NOT NULL,
    `IsPrepaid` INTEGER NOT NULL,
    `PrepaidVoucherImage` VARCHAR(191) NULL,
    `AssignedAdminId` VARCHAR(191) NULL,
    `DeliveryServiceId` VARCHAR(191) NULL,
    `CustomerId` VARCHAR(191) NOT NULL,
    `OrderAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `AcceptedAt` DATETIME(3) NULL,
    `DeliveredAt` DATETIME(3) NULL,
    `CustomerAddress` VARCHAR(191) NOT NULL,
    `CustomerPhone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CustomerOrder_OrderCode_key`(`OrderCode`),
    PRIMARY KEY (`CustomerOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `OrderProductId` VARCHAR(191) NOT NULL,
    `ProductName` VARCHAR(191) NOT NULL,
    `VariantName` VARCHAR(191) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Price` DOUBLE NOT NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `CustomerOrderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`OrderProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_AssignedAdminId_fkey` FOREIGN KEY (`AssignedAdminId`) REFERENCES `Admin`(`AdminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_DeliveryServiceId_fkey` FOREIGN KEY (`DeliveryServiceId`) REFERENCES `DeliveryService`(`DeliveryServiceId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `Customer`(`CustomerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_CustomerOrderId_fkey` FOREIGN KEY (`CustomerOrderId`) REFERENCES `CustomerOrder`(`CustomerOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
