/*
  Warnings:

  - You are about to drop the column `users_id` on the `carts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_users_id_fkey`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `users_id`;
