import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Technicians } from '../Models/technicians';

export class techniciansController {

    private techniciansRepository = AppDataSource.getRepository(Technicians)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.techniciansRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const technicians = await this.techniciansRepository.findOne({
            where: { id }
        })

        if (!technicians) {
            return "Técnico não registrado!!!"
        }
        return technicians
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { nome, cpf, cep, logradouro, numero, complemento, bairro, cidade, uf, fone_contato } = request.body;

        const items = Object.assign(new Technicians(), { 
            nome, 
	        cpf, 
	        cep, 
	        logradouro, 
	        numero, 
	        complemento, 
	        bairro, 
	        cidade, 
	        uf, 
	        fone_contato
        })

        return this.techniciansRepository.save(items)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let techniciansToRemove = await this.techniciansRepository.findOneBy({ id })

        if (!techniciansToRemove) {
            return "Este técnico não existe!!!"
        }

        await this.techniciansRepository.remove(techniciansToRemove)

        return "O técnico foi removido!!!"
    }

}