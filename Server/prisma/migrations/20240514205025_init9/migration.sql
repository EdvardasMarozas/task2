-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER UNSIGNED NULL,
    `product_id` INTEGER UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
