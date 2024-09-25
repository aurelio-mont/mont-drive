import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUserSchema } from "../../types/user";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import { singToken } from "../../utils/token";

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { success } = createUserSchema.safeParse({ email, password });

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

    const { userSigned } = singToken(id_user, email);

    res.json({
      message: "success",
      user: userSigned,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
