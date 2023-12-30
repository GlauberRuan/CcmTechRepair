import { AppDataSource } from "../db/data-source";
import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { Requests_clients } from '../Models/Requests_clients';
import { Request_items } from '../Models/Request_items';




export class RequestCliController {

    private Request_ClientsRepository = AppDataSource.getRepository(Requests_clients)

    private Request_itemsRepository = AppDataSource.getRepository(Request_items)



    async all(request: Request, response: Response, next: NextFunction) {
        return this.Request_ClientsRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const requests_clients = await this.Request_ClientsRepository.findOne({
            where: { id }
        })

        if (!requests_clients) {
            return "Requisição não registrada!!!"
        }
        return requests_clients
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { id_client, data_abertura, situation, requisItem } = request.body;

        const requests = Object.assign(new Requests_clients(), {
            id_client,
            data_abertura,
            situation,
            requisItem,
        })

        return this.Request_ClientsRepository.save(requests)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const { id_client, situation, data_abertura, requisItem } = request.body;

        const findRequest = await this.Request_ClientsRepository.findOneBy({ id });

        if (!findRequest) {
            return "Registro não encontrado!";
        }

        const reqCliItem = Object.assign(findRequest, requisItem )

        reqCliItem.id_client = id_client;
        reqCliItem.situation = situation;
        reqCliItem.data_abertura = data_abertura;
        reqCliItem.requisItem = requisItem;
        

        await this.Request_ClientsRepository.save(reqCliItem);

        return "Registro atualizado com sucesso!";
    }


    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let requestsToRemove = await this.Request_ClientsRepository.findOneBy({ id })

        if (!requestsToRemove) {
            return "Esta requisição não existe!!!"
        }

        await this.Request_ClientsRepository.remove(requestsToRemove)

        return "A requisição foi removida!!!"
    }

}