import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { Request, Response } from "express";
import "dotenv/config";
import "reflect-metadata";
import { RegisterController } from "./controllers/RegisterController";

const routes = Router();

routes.post("/user", (req: Request, res: Response) => {
    new UserController().create(req, res);

});
routes.post('/register/:id', (req: Request, res: Response) => {
    new RegisterController().create(req, res);

});

routes.get('/user', (req: Request, res: Response) => {
    new UserController().getAllUsers(req, res);

});
routes.get('/user/:id', (req: Request, res: Response) => {
    new UserController().getOneUser(req, res);

});

routes.get('/register', (req: Request, res: Response) => {
    new RegisterController().getAllRegisters(req, res);

});

routes.get('/register/:id', (req: Request, res: Response) => {
    new RegisterController().getOneRegister(req, res);

});

routes.put('/user/:id', (req: Request, res: Response) => {
    new UserController().fullUpdateUser(req, res);

});
routes.delete('/user/:id', (req: Request, res: Response) => {
    new UserController().deleteUser(req, res);

});

export default routes;
