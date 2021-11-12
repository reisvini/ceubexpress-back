/*
  Warnings:

  - You are about to drop the column `product_id` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `product_id`,
    DROP COLUMN `user_id`;
