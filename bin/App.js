"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppDataProvider_1 = __importDefault(require("./providers/AppDataProvider"));
const express = require("express");
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const AppRoutes_1 = __importDefault(require("./routes/AppRoutes"));
class App {
    constructor(config) {
        this.config = config;
        this.config = config;
        this.expApp = express();
        this.dataProvider = new AppDataProvider_1.default();
        App.app = this;
    }
    get providers() {
        return this.dataProvider;
    }
    static getInstance() {
        return App.app;
    }
    run() {
        this.expApp.use(express_session_1.default({
            resave: false,
            saveUninitialized: false,
            secret: 'klevytska',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(body_parser_1.default.urlencoded({ extended: true }));
        let appRouter = new AppRoutes_1.default();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.port, () => {
            console.info(`Server run at port ${this.config.port}`);
        });
    }
}
exports.default = App;
