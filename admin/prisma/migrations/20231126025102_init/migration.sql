-- CreateTable
CREATE TABLE `Category` (
    `CategoryId` VARCHAR(191) NOT NULL,
    `CategoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `SupplierId` VARCHAR(191) NOT NULL,
    `SupplierName` VARCHAR(191) NOT NULL,
    `SupplierImage` VARCHAR(191) NULL,

    PRIMARY KEY (`SupplierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
