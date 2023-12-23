-- CreateTable
CREATE TABLE `ProductStock` (
    `ProductStockId` VARCHAR(191) NOT NULL,
    `ProductStock` INTEGER NOT NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `ProductVariantId` VARCHAR(191) NOT NULL,
    `PurchaseProductId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductStock_ProductVariantId_key`(`ProductVariantId`),
    PRIMARY KEY (`ProductStockId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseProduct` (
    `PurchaseProductId` VARCHAR(191) NOT NULL,
    `PurchaseAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ProductId` VARCHAR(191) NOT NULL,
    `ProductVariantId` VARCHAR(191) NOT NULL,
    `PurchaseQuantity` INTEGER NOT NULL,
    `OriginalPrice` DOUBLE NOT NULL,
    `ExpiryDate` DATETIME(3) NOT NULL,
    `AdminId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`PurchaseProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `AdminId` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `AdminRoleId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_Email_key`(`Email`),
    PRIMARY KEY (`AdminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminRole` (
    `AdminRoleId` VARCHAR(191) NOT NULL,
    `AdminRoleName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdminRole_AdminRoleName_key`(`AdminRoleName`),
    PRIMARY KEY (`AdminRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `ProductVariant`(`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_PurchaseProductId_fkey` FOREIGN KEY (`PurchaseProductId`) REFERENCES `PurchaseProduct`(`PurchaseProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseProduct` ADD CONSTRAINT `PurchaseProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseProduct` ADD CONSTRAINT `PurchaseProduct_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `ProductVariant`(`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseProduct` ADD CONSTRAINT `PurchaseProduct_AdminId_fkey` FOREIGN KEY (`AdminId`) REFERENCES `Admin`(`AdminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_AdminRoleId_fkey` FOREIGN KEY (`AdminRoleId`) REFERENCES `AdminRole`(`AdminRoleId`) ON DELETE RESTRICT ON UPDATE CASCADE;
