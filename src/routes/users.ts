import { Router } from "express";
import { createUserController } from "../controllers/users/createUser";
import { loginUserController } from "../controllers/users/loginUser";
import { listUserController } from "../controllers/users/listUser";
import { validateToken } from "../middlewares/auth/validateToken";
import { updateUserController } from "../controllers/users/updateUser";
import { validateRightUser } from "../middlewares/auth/validateRightUser";

const usersRouter = Router();

usersRouter.get("/", [validateToken], listUserController);

usersRouter.post("/", createUserController);

usersRouter.post("/login", loginUserController)

usersRouter.put("/:id_user",[validateToken, validateRightUser], updateUserController);

usersRouter.delete("/", (req, res) => {
  res.send({ message: "DELETE" });
});

export default usersRouter;
