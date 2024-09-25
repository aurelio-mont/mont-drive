import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUserSchema } from "../../types/user";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { success, error } = createUserSchema.safeParse({ email, password });

    if (!success) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const result = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!result) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const id_user = result.id_user;
    const hashedPassword = result.password;

    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "success",
      user: {
        id_user,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
