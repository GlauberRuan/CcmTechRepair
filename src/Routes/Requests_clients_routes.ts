
import { RequestCliController } from "../controller/RequestCliController"


export const Routes = [{
    method: "get",
    route: "/RequestClient",
    controller: RequestCliController,
    action: "all"
}, {
    method: "get",
    route: "/RequestClient/:id",
    controller: RequestCliController,
    action: "one"
}, {
    method: "post",
    route: "/RequestClient",
    controller: RequestCliController,
    action: "create"
}, {
    method: "put",
    route: "/RequestClient/:id",
    controller: RequestCliController,
    action: "update"
},{
    method: "delete",
    route: "/RequestClient/:id",
    controller: RequestCliController,
    action: "remove"
}]