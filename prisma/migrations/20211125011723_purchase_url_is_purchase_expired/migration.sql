/*
  Warnings:

  - Added the required column `purchase_url` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `isPurchaseExpired` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `purchase_url` VARCHAR(500) NOT NULL;
