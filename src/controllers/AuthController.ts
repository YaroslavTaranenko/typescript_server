import App from "../App";
import { Request, Response, NextFunction } from 'express';
import UserDataProvider from "../providers/UserDataProvider";
import SecurityService from "../services/SecurityService";

export class AuthController {
    private userDataprovider: UserDataProvider;

    constructor(private app: App) {
        this.userDataprovider = this.app.providers.user;

    }

    login(req: Request, res: Response) {
        const email = req.body.email;
        const pass = req.body.password;

        this.userDataprovider.findOne({ email: email }, (err, user) => {
            if (err) {
                res.status(500).send();
            } else {
                if (!user || SecurityService.validatePassword(pass, user.password)) {
                    res.status(401).send({ msg: "Incorrect password", code: 401 });
                } else {
                    user.lastVisited = Date.now().toString();
                    this.userDataprovider.update({ _id: user._id }, user, (error, uNum) => {
                        if (error) console.error("LOGIN", error);
                        console.log('User has been updated.');
                    });
                    req.session.userId = user._id;
                    res.status(200).send({ msg: "Hello, welcome back!" });
                }
            }
        });
    }

    logout(req: Request, res: Response, next: NextFunction): void {
        let session = req.session;
        if (session) {
            session.destroy(() => {
                res.status(401).send("Goodbye. See nou");
            });
        } else {
            res.send("You not logged in.")
        }
    }
    checkLoginSession(req: Request, res: Response, next: NextFunction): void {
        let session = req.session;
        if (~['/logout', '/add'].indexOf(req.path)) {
            if (!session.userId) {
                next();
            } else {
                res.status(406).send();
            }
        } else {
            if (session.userId) {
                next();
            } else {
                res.status(401).send();
            }
        }
    }
}