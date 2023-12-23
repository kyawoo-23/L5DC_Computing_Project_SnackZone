-- CreateTable
CREATE TABLE `Customer` (
    `CustomerId` VARCHAR(191) NOT NULL,
    `CustomerName` VARCHAR(191) NOT NULL,
    `CustomerEmail` VARCHAR(191) NOT NULL,
    `CustomerPassword` VARCHAR(191) NULL,
    `CustomerImage` VARCHAR(191) NULL,
    `CustomerPhone` VARCHAR(191) NOT NULL,
    `CustomerAddress` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_CustomerEmail_key`(`CustomerEmail`),
    PRIMARY KEY (`CustomerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WishListProduct` (
    `WishListProductId` VARCHAR(191) NOT NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `ProductVariantId` VARCHAR(191) NOT NULL,
    `CustomerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`WishListProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WishListProduct` ADD CONSTRAINT `WishListProduct_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishListProduct` ADD CONSTRAINT `WishListProduct_ProductVariantId_fkey` FOREIGN KEY (`ProductVariantId`) REFERENCES `ProductVariant`(`ProductVariantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishListProduct` ADD CONSTRAINT `WishListProduct_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `Customer`(`CustomerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
