/*
  Warnings:

  - You are about to alter the column `purchase_url` on the `purchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `purchase` MODIFY `purchase_url` VARCHAR(191) NOT NULL;
