import { AppDataSource } from "../db/data-source";
import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { Requests_clients } from '../Models/Requests_clients';
import { transporter } from '../email/email';

export class RequestCliController {

    private Request_ClientsRepository = AppDataSource.getRepository(Requests_clients)

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

        try {

            const { id, id_client, data_abertura, situation, email, requisItem } = request.body;

            const requests = Object.assign(new Requests_clients(), {
                id,
                id_client,
                data_abertura,
                email,
                situation,
                requisItem,
            })

            transporter.sendMail({
                from: "Info Rio - HelpRio <fapsoftexprojetohelpdesk@gmail.com>",
                to: email,
                subject: "Registro de abertura de Chamado - Info Rio",
                text: `Seu chamado foi aberto com as seguintes informações:
                 
                  Nº do Chamado: ${requests.id}
                  Nº do Cliente: ${id_client}
                  Data abertura: ${data_abertura}
                  Requisições abertas: 
                  ${JSON.stringify(requisItem, null, 2).split('\n').map(line => '' + line).join('\n')}\n`
            }).then(message => {
                console.log(message)
            }).catch(err => {
                console.log(err);
            });

            return this.Request_ClientsRepository.save(requests);

        } catch (error) {

            response.status(500).json({ error: 'Erro interno durante a inclusão!' });

        }
    }

    async update(request: Request, response: Response, next: NextFunction) {

        try {

            const id = parseInt(request.params.id);
            const { id_client, situation, data_abertura, requisItem } = request.body;
            const findRequest = await this.Request_ClientsRepository.findOneBy({ id });

            if (!findRequest) {
                return "Chamado não encontrado!";
            }

            const reqCliItem = Object.assign(findRequest, requisItem)

            reqCliItem.id_client = id_client;
            reqCliItem.situation = situation;
            reqCliItem.data_abertura = data_abertura;
            reqCliItem.requisItem = requisItem;

            await this.Request_ClientsRepository.save(reqCliItem);

            return "Chamado atualizado com sucesso!";

        } catch (error) {

            response.status(500).json({ error: 'Erro interno durante a atualização!' });

        }
    }


    async remove(request: Request, response: Response, next: NextFunction) {

        try {

            const id = parseInt(request.params.id)

            let requestsToRemove = await this.Request_ClientsRepository.findOneBy({ id })

            if (!requestsToRemove) {
                return "Esta requisição não existe!!!"
            }

            await this.Request_ClientsRepository.remove(requestsToRemove)

            return "A requisição foi excluída!!!"

        } catch (error) {

            return response.status(500).json({ error: 'Erro interno durante a exclusão' });
        }

    }
}