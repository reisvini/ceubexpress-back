/*
  Warnings:

  - Added the required column `amount` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `amount` INTEGER NOT NULL;
