import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { schemaQuery } from "../types/general";
import { convertToNumber } from "../utils/numbers";
import { db } from "../db";

import bcrypt from "bcryptjs";

import { usersTable } from "../db/schema";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "../types/user";
import { singToken } from "../utils/token";

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

export const listUserController = async (req: Request, res: Response) => {
  try {
    const validFields = schemaQuery.safeParse({
      page: convertToNumber(req.query.page, 1),
      per_page: convertToNumber(req.query.per_page, 5),
    });
    if (!validFields.success) {
      return res.status(400).json({
        message: "bad request",
        error: validFields.error,
      });
    }
    const { page, per_page } = validFields.data;
    const result = await db.query.usersTable.findMany({
      columns: {
        id_user: true,
        email: true,
      },
      limit: per_page,
      offset: (page - 1) * per_page,
    });
    res.json({
      message: "success",
      users: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

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
