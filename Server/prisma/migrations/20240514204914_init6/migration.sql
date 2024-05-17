/*
  Warnings:

  - You are about to drop the column `products_id` on the `carts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_products_id_fkey`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `products_id`,
    ADD COLUMN `product_id` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
