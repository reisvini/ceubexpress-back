/*
  Warnings:

  - You are about to drop the column `permission` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isUserAdmin]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_roleId_fkey`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `permission`,
    ADD COLUMN `isUserAdmin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `isUserAdmin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `role_isUserAdmin_key` ON `role`(`isUserAdmin`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_isUserAdmin_fkey` FOREIGN KEY (`isUserAdmin`) REFERENCES `role`(`isUserAdmin`) ON DELETE RESTRICT ON UPDATE CASCADE;
