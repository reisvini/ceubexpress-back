/*
  Warnings:

  - You are about to drop the `productonpuchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productonpuchase` DROP FOREIGN KEY `productOnPuchase_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productonpuchase` DROP FOREIGN KEY `productOnPuchase_purchaseId_fkey`;

-- DropTable
DROP TABLE `productonpuchase`;

-- CreateTable
CREATE TABLE `productOnPurchase` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productOnPurchase` ADD CONSTRAINT `productOnPurchase_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productOnPurchase` ADD CONSTRAINT `productOnPurchase_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
