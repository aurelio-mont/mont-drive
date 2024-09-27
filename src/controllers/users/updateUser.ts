import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { updateUserSchema } from "../../types/user";
import { eq } from "drizzle-orm";

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params;

    const { email, password } = req.body;
    let hashedPassword: undefined | string = undefined;
    if (password) hashedPassword = bcrypt.hashSync(password);

    const { success, error } = updateUserSchema.safeParse({
      id_user,
      email,
      password: hashedPassword,
    });

    if (!success) {
      return res.status(400).json({
        message: "bad request",
        error: error,
      });
    }

    const result = await db
      .update(usersTable)
      .set({
        email,
        password: hashedPassword,
      })
      .where(eq(usersTable.id_user, id_user))
      .returning({
        email: usersTable.email,
        id_user: usersTable.id_user,
      });

    if (!result.at(0)) {
      return res.status(404).json({
        message: "user not found",
      });
    }

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
