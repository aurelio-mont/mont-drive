import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { createUserSchema } from "../../types/user";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const { success, error } = createUserSchema.safeParse({ email, password });

    if (!success) {
      return res.status(400).json({
        message: "bad request",
        error: error,
      });
    }

    const result = await db
      .insert(usersTable)
      .values({
        id_user: crypto.randomUUID(),
        email,
        password: hashedPassword,
      })
      .returning({
        email: usersTable.email,
        id_user: usersTable.id_user,
      });

    res.json({
      message: "success",
      user: result.at(0),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
