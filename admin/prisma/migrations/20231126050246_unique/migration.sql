/*
  Warnings:

  - A unique constraint covering the columns `[CategoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SupplierName]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_CategoryName_key` ON `Category`(`CategoryName`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_SupplierName_key` ON `Supplier`(`SupplierName`);
