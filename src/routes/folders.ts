import { Router } from "express";


const foldersRouter = Router();

foldersRouter.get("/", (req, res) => {
    res.send("Hello folders");
});

export default foldersRouter