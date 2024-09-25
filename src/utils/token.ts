import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const singToken = (id_user: string, email: string) => {
  const token = jwt.sign({ id_user, email }, TOKEN_SECRET, { expiresIn: "1d" });

  return { valid: true, userSigned: { id_user, email, token } };
};

export const verifyToken = (token: string) => {
  try {
    const { id_user, email } = jwt.verify(token, TOKEN_SECRET) as {
      id_user: string;
      email: string;
    };

    return { valid: true, userSigned: { id_user, email, token } };
  } catch (error) {
    return error;
  }
};
