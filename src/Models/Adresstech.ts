import "reflect-metadata"
import { Technicians } from './technicians';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"




@Entity()
export class Addresstech {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    cep: string

    @Column({ type: "varchar" })
    logradouro: string

    @Column({ type: "int" })
    numero: number

    @Column({ type: "varchar" })
    complemento: string

    @Column({ type: "varchar" })
    bairro: string

    @Column({ type: "varchar" })
    cidade: string

    @Column({ type: "varchar" })
    uf: string

    @Column({ type: "varchar" })
    fone_contato:  string

    @ManyToOne(() => Technicians, (techAddress) => techAddress.techAd, { 
        onDelete: 'CASCADE',
    })
    techAd: Technicians;

   
}