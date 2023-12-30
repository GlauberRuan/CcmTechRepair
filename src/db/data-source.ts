import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "../Models/Client"
import { Requests_clients } from "../Models/Requests_clients"
import { Request_items } from "../Models/Request_items"
import { Systems } from "../Models/Systems"
import { Technicians } from "../Models/technicians"
import { Client_Systems } from "../Models/Client_systems"
import { Address } from "../Models/Adress"
import { Addresstech } from "../Models/Adresstech"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234567",
    database: "helprio",
    synchronize: true,
    logging: true,
    entities: [Client, Requests_clients, Request_items, Systems, Technicians, Client_Systems, Address, Addresstech],
    migrations: [],
    subscribers: [],
})

