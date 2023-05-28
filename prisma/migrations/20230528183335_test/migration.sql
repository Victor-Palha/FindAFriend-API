/*
  Warnings:

  - Added the required column `test` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pets` ADD COLUMN `test` VARCHAR(191) NOT NULL;
