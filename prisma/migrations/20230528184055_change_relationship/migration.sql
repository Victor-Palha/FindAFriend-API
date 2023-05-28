-- DropForeignKey
ALTER TABLE `pets` DROP FOREIGN KEY `pets_user_id_fkey`;

-- AlterTable
ALTER TABLE `pets` MODIFY `user_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;
