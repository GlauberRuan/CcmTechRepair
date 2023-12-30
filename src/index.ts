import * as express from "express"
//import express from 'express'
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./db/data-source"
import { Routes as Requests_clients_routes } from "./Routes/Requests_clients_routes"
import { Routes as Clientroutes } from "./Routes/Clientroutes"
import { Routes as Systemsroutes} from "./Routes/Systemsroutes"
import { Routes as techniciansroutes }  from "./Routes/techniciansroutes"


async function initializeApp() {
   
      await AppDataSource.initialize();
  
      const app = express();
      app.use(bodyParser.json());
  
      // Função de middleware para processar as rotas
      function registerRoutes(routes: any[]) {
        routes.forEach((route) => {
          (app as any)[route.method](
            route.route,
            async (req: Request, res: Response, next: NextFunction) => {
          
                const result = await new (route.controller as any)()[route.action](req, res, next);
  
                if (result !== null && result !== undefined) {
                  res.json(result);
                } else {
                  next();
                }
            }
          );
        });
      }
  
      // Registrar as rotas
      registerRoutes(Clientroutes);
      registerRoutes(techniciansroutes);
      registerRoutes(Systemsroutes);
      registerRoutes(Requests_clients_routes);
  
      app.listen(3000, () => {
        console.log("O servidor foi iniciado na porta 3000. Abrir http://localhost:3000/ para os resultados!");
      });
    
  }
  
  initializeApp();
  



