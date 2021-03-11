"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoute_1 = __importDefault(require("./UserRoute"));
const express_1 = require("express");
class AppRoutes {
    constructor() {
        this.routeList = [{
                path: '/user', router: UserRoute_1.default
            }];
    }
    mount(expApp) {
        this.routeList.forEach(item => {
            expApp.use(item.path, item.router.createRoute(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
