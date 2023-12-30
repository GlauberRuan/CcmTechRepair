import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Systems {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    nome:  string

    @Column({ type: "varchar" })
    descricao: string

    

}
