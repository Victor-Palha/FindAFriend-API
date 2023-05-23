-- CreateTable
CREATE TABLE `users` (
    `id_user` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orgs` (
    `id_org` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `orgs_phone_key`(`phone`),
    UNIQUE INDEX `orgs_user_id_key`(`user_id`),
    PRIMARY KEY (`id_org`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id_pet` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `race` VARCHAR(191) NOT NULL,
    `castrated` BOOLEAN NOT NULL,
    `vaccine_record` BOOLEAN NOT NULL,
    `org_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orgs` ADD CONSTRAINT `orgs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `orgs`(`id_org`) ON DELETE RESTRICT ON UPDATE CASCADE;
