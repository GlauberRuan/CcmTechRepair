import { Addresstech } from "./Adresstech";
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Technicians {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    nome:  string

    @Column({ type: "bigint" })
    cpf: number
   
    @OneToMany(() => Addresstech, (addressTech) => addressTech.techAd, { 
        cascade: true,
        eager: true,
    })
    techAd: Addresstech[]
    
}
