/*
  Warnings:

  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_product_id_fkey`;

-- DropTable
DROP TABLE `carts`;
