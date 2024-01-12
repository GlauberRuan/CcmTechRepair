import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Systems } from '../Models/Systems';


export class SystemsController {

    private SystemsRepository = AppDataSource.getRepository(Systems)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.SystemsRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const system = await this.SystemsRepository.findOne({
            where: { id }
        })

        if (!system) {
            return "Sistema não registrado!!!"
        }
        return system
    }

    async save(request: Request, response: Response, next: NextFunction) {

        try {

            const { nome, descricao } = request.body;

            const client = Object.assign(new Systems(), {
                nome,
                descricao
            })

            return this.SystemsRepository.save(client)

        } catch (error) {

            return response.status(500).json({ error: 'Erro interno durante a inclusão!' });
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {

        try {

            const id = parseInt(request.params.id);
            const { nome, descricao } = request.body;

            const findSystem = await this.SystemsRepository.findOneBy({ id });

            if (!findSystem) {
                return "Registro não encontrado!";
            }

            findSystem.nome = nome;
            findSystem.descricao = descricao;

            await this.SystemsRepository.update(id, findSystem);

            return "Sistema atualizado com sucesso!";

        } catch (error) {

            return response.status(500).json({ error: 'Erro interno durante a atualização!' });
        }

    }

    async remove(request: Request, response: Response, next: NextFunction) {

        try {

            const id = parseInt(request.params.id)

            let systemsToRemove = await this.SystemsRepository.findOneBy({ id })

            if (!systemsToRemove) {
                return "Este sistema não existe!!!"
            }

            await this.SystemsRepository.remove(systemsToRemove)

            return "O Sistema foi removido!!!"

        } catch (error) {

            return response.status(500).json({ error: 'Erro interno durante a exclusão!' });
        }

    }
}