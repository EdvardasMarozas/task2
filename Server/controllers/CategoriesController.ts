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
  getCategoryById: async function (req: Request, res: Response) {
    try {
      const response = await prisma.categories.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllCategories: async function (req: Request, res: Response) {
    try {
      const response = await prisma.categories.findMany();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getProductsByCategory: async function (req: Request, res: Response) {
    try {
      const response = await prisma.products.findMany({
        where: {
          categories_id: Number(req.params.id),
        },
        orderBy: {
          name: "asc",
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
