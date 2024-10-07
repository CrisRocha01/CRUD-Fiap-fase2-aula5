import express from "express";
import { AppDataSource } from "./data-source";
import "dotenv/config";
import "reflect-metadata";
import routes from "./routes";
//import routes from './routes';

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(routes);
    app.listen(process.env.API_PORT, async () =>
        console.log(`conectado e rodando no endereço http://localhost:${process.env.API_PORT}`)
    );
});
