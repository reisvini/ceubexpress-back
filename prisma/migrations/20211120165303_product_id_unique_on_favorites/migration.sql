/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `favorites_productId_key` ON `favorites`(`productId`);
