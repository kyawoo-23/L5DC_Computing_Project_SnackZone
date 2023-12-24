-- CreateTable
CREATE TABLE `CartProduct` (
    `CartProductId` VARCHAR(191) NOT NULL,
    `ProductQuantity` INTEGER NOT NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `CustomerId` VARCHAR(191) NOT NULL,
    `ProductVariantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CartProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `Customer`(`CustomerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `ProductVariant`(`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;
