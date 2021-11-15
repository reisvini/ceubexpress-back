/*
  Warnings:

  - You are about to drop the column `productId` on the `purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `purchase_productId_fkey`;

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `productPuchase` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_productPuchaseTopurchase` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_productPuchaseTopurchase_AB_unique`(`A`, `B`),
    INDEX `_productPuchaseTopurchase_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productPuchase` ADD CONSTRAINT `productPuchase_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productPuchaseTopurchase` ADD FOREIGN KEY (`A`) REFERENCES `productPuchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productPuchaseTopurchase` ADD FOREIGN KEY (`B`) REFERENCES `purchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
