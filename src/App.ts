import AppDataProvider from "./providers/AppDataProvider";
import { Express, NextFunction } from "express";
const express = require("express");
import IAppConfig from "./configs/IAppConfig";
import session from "express-session";
import bodyParser from "body-parser";
import AppRoutes from "./routes/AppRoutes";

export default class App {
    private static app: App;
    private expApp: Express;
    private dataProvider: AppDataProvider;

    get providers(): AppDataProvider {
        return this.dataProvider;
    }

    public static getInstance(): App {
        return App.app;
    }

    constructor(private config: IAppConfig) {
        this.config = config;
        this.expApp = express();
        this.dataProvider = new AppDataProvider();
        App.app = this;
    }
    run(): void {
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'klevytska',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(bodyParser.urlencoded({ extended: true }));
        // this.expApp.use((req: Request, res: Response, next: NextFunction)=>{
        //     res.contentType('Application/json');
        //     next();
        // });


        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);

        this.expApp.listen(this.config.port, () => {
            console.info(`Server run at port ${this.config.port}`);
        })
    }
}