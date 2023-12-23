-- CreateTable
CREATE TABLE `Variant` (
    `VariantId` VARCHAR(191) NOT NULL,
    `VariantName` VARCHAR(191) NOT NULL,
    `VariantColor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Variant_VariantName_key`(`VariantName`),
    PRIMARY KEY (`VariantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
