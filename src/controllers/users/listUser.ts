import { Request, Response } from "express";
import { schemaQuery } from "../../types/general";
import { convertToNumber } from "../../utils/numbers";
import { db } from "../../db";

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
      offset: (page - 1 )* per_page,
    })
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
