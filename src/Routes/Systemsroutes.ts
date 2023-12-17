
import { SystemsController } from "../controller/SystemsController"

export const Routes = [{
    method: "get",
    route: "/Systems",
    controller: SystemsController,
    action: "all"
}, {
    method: "get",
    route: "/Systems/:id",
    controller: SystemsController,
    action: "one"
}, {
    method: "post",
    route: "/Systems",
    controller: SystemsController,
    action: "save"
}, {
    method: "delete",
    route: "/Systems/:id",
    controller: SystemsController,
    action: "remove"
}]