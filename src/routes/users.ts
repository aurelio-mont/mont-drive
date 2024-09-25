import { Router } from "express";
import { createUserController } from "../controllers/users/createUser";
import { loginUserController } from "../controllers/users/loginUser";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.send({ message: "GET" });
});

usersRouter.post("/", createUserController);

usersRouter.post("/login", loginUserController)

usersRouter.put("/", (req, res) => {
  res.send({ message: "PUT" });
});

usersRouter.delete("/", (req, res) => {
  res.send({ message: "DELETE" });
});

export default usersRouter;
