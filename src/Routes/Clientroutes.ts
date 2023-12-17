
import { ClientController } from "../controller/ClientsController"

export const Routes = [{
    method: "get",
    route: "/client",
    controller: ClientController,
    action: "all"
}, {
    method: "get",
    route: "/client/:id",
    controller: ClientController,
    action: "one"
}, {
    method: "post",
    route: "/client",
    controller: ClientController,
    action: "create"
}, {
    method: "delete",
    route: "/client/:id",
    controller: ClientController,
    action: "remove"
}]