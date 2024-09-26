import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token";

export const validateRightUser = (req: Request, res: Response, next: NextFunction) => {
    const { id_user } = req.params;
    const token  = req.headers.auth_token as string;
    const { userSigned, error } = verifyToken(token);

    if (error) {
        return res.status(401).json({
            message: "Unauthorized",
            error,
        });
    }

    if (id_user !== userSigned.id_user) {
        return res.status(401).json({
            message: "Unauthorized",
            error: {
                message: "you can not update this user",
            },
        });
    }
    next();
}