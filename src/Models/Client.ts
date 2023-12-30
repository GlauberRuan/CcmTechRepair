import "reflect-metadata";
import { Client_Systems } from './Client_systems';
import { Address } from "./Adress";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";



@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    tipo:  string

    @Column({ type: "bigint" })
    cpf:  number

    @Column({ type: "bigint" })
    cnpj:  number

    @Column({ type: "varchar" })
    nome_razao:  string

    @Column({ type: "varchar" })
    email:  string
    
    @Column({ type: "varchar" })
    nome_responsavel:  string

    @Column({ type: "varchar" })
    fone_responsavel:  string

    @Column({ type: "varchar" })
    nome_contato_1:  string

    @Column({ type: "varchar" })
    fone_contato_1:  string

    @Column({ type: "varchar" })
    nome_contato_2:  string

    @Column({ type: "varchar" })
    fone_contato_2:  string

    @OneToMany(() => Address, (addressCli) => addressCli.clientAd, { 
        cascade: true,
        eager: true,
    })
    clientAd: Address[]

    @OneToMany(() => Client_Systems, (clisystem) => clisystem.client, { 
        cascade: true,
        eager: true,
    })
    clisystem: Client_Systems[]

}
