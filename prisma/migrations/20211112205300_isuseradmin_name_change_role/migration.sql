/*
  Warnings:

  - You are about to drop the column `isUserAdmin` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_isUserAdmin_fkey`;

-- DropIndex
DROP INDEX `role_isUserAdmin_key` ON `role`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `isUserAdmin`,
    ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `role_admin_key` ON `role`(`admin`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_isUserAdmin_fkey` FOREIGN KEY (`isUserAdmin`) REFERENCES `role`(`admin`) ON DELETE RESTRICT ON UPDATE CASCADE;
