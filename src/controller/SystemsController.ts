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
        const { nome, descricao } = request.body;

        const client = Object.assign(new Systems(), {
            nome, 
            descricao 
        })

        return this.SystemsRepository.save(client)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let systemsToRemove = await this.SystemsRepository.findOneBy({ id })

        if (!systemsToRemove) {
            return "Este sistema não existe!!!"
        }

        await this.SystemsRepository.remove(systemsToRemove)

        return "O Sistema foi removido!!!"
    }

}