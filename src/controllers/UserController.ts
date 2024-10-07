import { registerRepository } from "./../repositories/registerRepository";
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { chownSync } from "fs";
import { User } from "../entities/User";
import { Register } from "../entities/Register";
import { DataSource, QueryBuilder } from "typeorm";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;
        if (!name) {
            return res.status(4).json({ message: "Name is required" });
        }

        try {
            const newUser = userRepository.create({
                name,
                email,
            });
            await userRepository.save(newUser);
            return res.status(201).json({ newUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const listAllUser = await userRepository.find({
                relations: {
                    registers: true,
                },
            });
            return res.status(200).json(listAllUser);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getOneUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (id) {
                const user = await userRepository.findOneBy({ id: Number(id) });

                return res.status(200).json(user);
            }
            return res.status(404).send("Usuário não localizado");
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async fullUpdateUser(req: Request, res: Response) {
        const { name, email } = req.body;
        const { id } = req.params;
        try {
            if (!id) {
                return res
                    .status(404)
                    .json({ message: "Usuário não encontrado" });
            }

            const resultQuery = await userRepository
                .createQueryBuilder()
                .update()
                .set({ name, email })
                .where({ id: Number(id) })
                .execute();

            if (resultQuery.affected === 0) {
                return res
                    .status(404)
                    .json({ message: "Usuário não encontrado" });
            }

            return res
                .status(200)
                .json({ message: `Usuário id ${id} atualizado` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepository.findOne({
            where: { id: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        await userRepository.remove(user);
        return res.status(200).json({ message: ` usuário id ${id} deletado ` });
    }
}
