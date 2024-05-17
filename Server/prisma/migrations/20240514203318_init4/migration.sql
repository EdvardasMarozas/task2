/*
  Warnings:

  - You are about to drop the column `cart_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_cart_id_fkey`;

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `cart_id` INTEGER UNSIGNED NULL,
    ADD COLUMN `users_id` INTEGER UNSIGNED NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `cart_id`;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
