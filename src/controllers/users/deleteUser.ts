import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { deleteUserSchema } from "../../types/user";
import { eq } from "drizzle-orm";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params;

    const { success, error } = deleteUserSchema.safeParse({
      id_user,
    });

    if (!success) {
      return res.status(400).json({
        message: "bad request",
        error: error,
      });
    }

    const result = await db
      .delete(usersTable)
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
