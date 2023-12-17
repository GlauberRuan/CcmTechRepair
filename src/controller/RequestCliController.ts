import { AppDataSource } from "../db/data-source";
import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { Requests_clients } from '../Models/Requests_clients';


export class RequestCliController {

    private Request_ClientsRepository = AppDataSource.getRepository(Requests_clients)



    async all(request: Request, response: Response, next: NextFunction) {
        return this.Request_ClientsRepository.find({
            relations: {
                requisItem: false,
            },
        })
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

    async put(request: Request, response: Response, next: NextFunction) {
        const  id  = parseInt(request.params.id);
        const { situation } = request.body;

        const registroExistente = await this.Request_ClientsRepository.findOne({ where: { id } });

        if (!registroExistente) {
            return "Esta requisição não existe!!!"
        }

        registroExistente.situation = situation;
        await this.Request_ClientsRepository.save(registroExistente)

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