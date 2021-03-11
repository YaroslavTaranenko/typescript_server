"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
try {
    new App_1.default({
        port: 8080,
        applicationName: 'Typescript Server'
    }).run();
}
catch (e) {
    console.log(e.message);
}
