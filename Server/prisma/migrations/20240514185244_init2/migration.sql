/*
  Warnings:

  - You are about to drop the column `productsId` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_productsId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `productsId`,
    ADD COLUMN `products_id` INTEGER UNSIGNED NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cart_id` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cart_id_key`(`cart_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_products_id_fkey` FOREIGN KEY (`products_id`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
