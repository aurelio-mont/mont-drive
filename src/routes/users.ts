import { Router } from "express";
import { createUserController } from "../controllers/users/createUser";
import { loginUserController } from "../controllers/users/loginUser";
import { listUserController } from "../controllers/users/listUser";

const usersRouter = Router();

usersRouter.get("/", listUserController);

usersRouter.post("/", createUserController);

usersRouter.post("/login", loginUserController)

usersRouter.put("/", (req, res) => {
  res.send({ message: "PUT" });
});

usersRouter.delete("/", (req, res) => {
  res.send({ message: "DELETE" });
});

export default usersRouter;
