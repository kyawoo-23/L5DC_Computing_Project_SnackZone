-- CreateTable
CREATE TABLE `Product` (
    `ProductId` VARCHAR(191) NOT NULL,
    `ProductName` VARCHAR(191) NOT NULL,
    `ProductDescription` VARCHAR(191) NOT NULL,
    `ProductPrimaryImage` VARCHAR(191) NOT NULL,
    `ProductWeight` DOUBLE NOT NULL,
    `ProductPrice` DOUBLE NOT NULL,
    `WholesalePrice` DOUBLE NULL,
    `ProductPackingQuantity` INTEGER NOT NULL,
    `IsPromotion` INTEGER NOT NULL DEFAULT 0,
    `PromotionPrice` DOUBLE NULL,
    `IsFeatured` INTEGER NOT NULL DEFAULT 0,
    `SupplierId` VARCHAR(191) NOT NULL,
    `CategoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductVariant` (
    `ProductVariantId` VARCHAR(191) NOT NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `VariantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ProductVariantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_SupplierId_fkey` FOREIGN KEY (`SupplierId`) REFERENCES `Supplier`(`SupplierId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`CategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_VariantId_fkey` FOREIGN KEY (`VariantId`) REFERENCES `Variant`(`VariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;
