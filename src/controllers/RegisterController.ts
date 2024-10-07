import { Register } from "../entities/Register";
import { User } from "../entities/User";
import { registerRepository } from "../repositories/registerRepository";
import { userRepository } from "../repositories/userRepository";
import { Request, Response } from "express";

export class RegisterController {
    async create(req: Request, res: Response) {
        const { clock_in, clock_out } = req.body;
        const { id } = req.params;

        try {
            const user = await userRepository.findOneBy({ id: Number(id) });

            if (!user) {
                return res.status(404).json({ message: "Aula não existe" });
            }

            const newRegister: Register = registerRepository.create({
                clock_in,
                clock_out,
                user,
            });
            const completeNewRegister = await registerRepository.save(
                newRegister
            );

            return res.status(201).json(completeNewRegister);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getAllRegisters(req: Request, res: Response) {
        try {
            const register = await registerRepository.find({
                relations: {
                    user: true,
                },
            });

            return res.status(200).json(register);
        } catch (error) {
            console.log(error);
        }
    }

    async getOneRegister(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(404)
                    .json({ message: "Usuário não encontrado" });
            }
            const register = await registerRepository.findOne({
                where: {
                    id: Number(id),
                },

                relations: {
                    user: true,
                },
            });

            return res.status(200).json(register);
        } catch (error) {
            console.log(error);
        }
    }
}
