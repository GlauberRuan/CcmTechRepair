import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Technicians } from '../Models/technicians';
import { Addresstech } from '../Models/Adresstech';

export class techniciansController {

  private techniciansRepository = AppDataSource.getRepository(Technicians)
  private adresstechRepository = AppDataSource.getRepository(Addresstech)

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

  async create(request: Request, response: Response, next: NextFunction) {
    const { nome, cpf, techAd } = request.body;

    const items = Object.assign(new Technicians(), {
      nome,
      cpf,
      techAd,

    })

    return this.techniciansRepository.save(items)
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const { nome, cpf, techAd } = request.body;

    const findTech = await this.techniciansRepository.findOneBy({ id });

    if (!findTech) {
        return "Técnico não encontrado!";
    }

    const technAd = Object.assign(findTech, techAd )

    technAd.nome = nome;
    technAd.cpf = cpf;
    technAd.techAd = techAd;
    
    await this.techniciansRepository.save(technAd);

    return "Técnico atualizado com sucesso!";
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