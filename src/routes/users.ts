import { Router } from "express";
import {
  listUserController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
} from "../controllers/users-controller";
import { validateToken } from "../middlewares/auth/validateToken";
import { validateRightUser } from "../middlewares/auth/validateRightUser";

const usersRouter = Router();

usersRouter.get("/", [validateToken], listUserController);

usersRouter.post("/", createUserController);

usersRouter.post("/login", loginUserController);

usersRouter.put(
  "/:id_user",
  [validateToken, validateRightUser],
  updateUserController
);

usersRouter.delete(
  "/:id_user",
  [validateToken, validateRightUser],
  deleteUserController
);

export default usersRouter;
