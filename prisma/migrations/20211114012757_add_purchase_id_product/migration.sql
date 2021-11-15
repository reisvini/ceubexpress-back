/*
  Warnings:

  - You are about to drop the `_productpuchasetopurchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productpuchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_productpuchasetopurchase` DROP FOREIGN KEY `_productpuchasetopurchase_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_productpuchasetopurchase` DROP FOREIGN KEY `_productpuchasetopurchase_ibfk_2`;

-- DropForeignKey
ALTER TABLE `productpuchase` DROP FOREIGN KEY `productPuchase_productId_fkey`;

-- DropTable
DROP TABLE `_productpuchasetopurchase`;

-- DropTable
DROP TABLE `productpuchase`;

-- CreateTable
CREATE TABLE `productOnPuchase` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productOnPuchase` ADD CONSTRAINT `productOnPuchase_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productOnPuchase` ADD CONSTRAINT `productOnPuchase_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
