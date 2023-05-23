/*
  Warnings:

  - The values [ADMIN] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `pets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orgs` ADD COLUMN `cnpj` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pets` ADD COLUMN `situation` ENUM('ADOPTED', 'ADOPTION') NOT NULL DEFAULT 'ADOPTION',
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('ORG', 'USER') NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `orgs_cnpj_key` ON `orgs`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `pets_user_id_key` ON `pets`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_cpf_key` ON `users`(`cpf`);

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
