
import { RequestItemController } from "../controller/RequestItemsController"


export const Routes = [{
    method: "get",
    route: "/RequestItem",
    controller: RequestItemController,
    action: "all"
}, {
    method: "get",
    route: "/RequestItem/:id",
    controller: RequestItemController,
    action: "one"
}, {
    method: "post",
    route: "/RequestItem",
    controller: RequestItemController,
    action: "save"
}, {
    method: "delete",
    route: "/RequestItem/:id",
    controller: RequestItemController,
    action: "remove"
}]