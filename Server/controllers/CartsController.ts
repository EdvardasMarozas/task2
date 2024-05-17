import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function hasMessage(x: unknown): x is { message: string } {
  return Boolean(
    typeof x === "object" &&
      x &&
      "message" in x &&
      typeof x.message === "string"
  );
}

module.exports = {
  getCartById: async function (req: Request, res: Response) {
    try {
      const response = await prisma.carts.findMany({
        where: {
          cart_id: Number(req.params.id),
        },
        include: {
          products: true,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllCarts: async function (req: Request, res: Response) {
    try {
      const response = await prisma.carts.findMany();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  decrementQuantity: async function (req: Request, res: Response) {
    try {
      const cartId = Number(req.params.id);
      const productId = Number(req.body.productId);
      const quantity = Number(req.body.quantity);

      if (quantity && quantity > 1) {
        const response = await prisma.carts.updateMany({
          where: {
            cart_id: Number(cartId),
            AND: {
              product_id: productId,
            },
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });
        res.status(200).json(response);
      } else {
        res.status(400).json({ msg: "Quantity must be greater than 1" });
      }
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  incrementQuantity: async function (req: Request, res: Response) {
    try {
      const response = await prisma.carts.updateMany({
        where: {
          cart_id: Number(req.body.cart_id),
          AND: {
            product_id: Number(req.body.productId),
          },
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  deleteSpecificProducFromCart: async function (req: Request, res: Response) {
    try {
      const response = await prisma.carts.deleteMany({
        where: {
          cart_id: Number(req.params.id),
          AND: {
            product_id: Number(req.body.item_id),
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
};
