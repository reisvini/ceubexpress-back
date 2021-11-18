/*
  Warnings:

  - You are about to drop the column `productId` on the `purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePurchaseReference]` on the table `purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePaymentIntent]` on the table `purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripe_price_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `purchase_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `stripe_price_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `productId`,
    ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stripePaymentIntent` VARCHAR(191) NULL,
    ADD COLUMN `stripePurchaseReference` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `productOnPurchase` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `purchase_stripePurchaseReference_key` ON `purchase`(`stripePurchaseReference`);

-- CreateIndex
CREATE UNIQUE INDEX `purchase_stripePaymentIntent_key` ON `purchase`(`stripePaymentIntent`);

-- AddForeignKey
ALTER TABLE `productOnPurchase` ADD CONSTRAINT `productOnPurchase_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productOnPurchase` ADD CONSTRAINT `productOnPurchase_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
