import { AppDataSource } from "../data-source";
import { Register } from "../entities/Register";


export const registerRepository = AppDataSource.getRepository(Register);