
import { techniciansController } from "../controller/techniciansController"



export const Routes = [{
    method: "get",
    route: "/technicians",
    controller: techniciansController,
    action: "all"
}, {
    method: "get",
    route: "/technicians/:id",
    controller: techniciansController,
    action: "one"
}, {
    method: "post",
    route: "/technicians",
    controller: techniciansController,
    action: "create"
}, 
{
    method: "put",
    route: "/technicians/:id",
    controller: techniciansController,
    action: "update"
},{
    method: "delete",
    route: "/technicians/:id",
    controller: techniciansController,
    action: "remove"
}]