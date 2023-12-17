import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Request_items } from '../Models/Request_items';

export class RequestItemController {

    private RequestItemRepository = AppDataSource.getRepository(Request_items)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.RequestItemRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const items = await this.RequestItemRepository.findOne({
            where: { id }
        })

        if (!items) {
            return "Itens não registrados!!!"
        }
        return items
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id_system, ocorrencia   } = request.body;

        const item = Object.assign(new RequestItemController(), {
            id_system, 
            ocorrencia
        })

        return this.RequestItemRepository.save(item)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let itemToRemove = await this.RequestItemRepository.findOneBy({ id })

        if (!itemToRemove) {
            return "Este item não existe!!!"
        }

        await this.RequestItemRepository.remove(itemToRemove)

        return "O item foi removido!!!"
    }

}