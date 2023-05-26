/*
  Warnings:

  - You are about to drop the column `user_id` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orgs` DROP FOREIGN KEY `orgs_user_id_fkey`;

-- AlterTable
ALTER TABLE `orgs` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `orgs_email_key` ON `orgs`(`email`);
