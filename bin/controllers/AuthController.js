"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
class AuthController {
    constructor(app) {
        this.app = app;
        this.userDataprovider = this.app.providers.user;
    }
    login(req, res) {
        const email = req.body.email;
        const pass = req.body.password;
        this.userDataprovider.findOne({ email: email }, (err, user) => {
            if (err) {
                res.status(500).send();
            }
            else {
                if (!user || SecurityService_1.default.validatePassword(pass, user.password)) {
                    res.status(401).send({ msg: "Incorrect password", code: 401 });
                }
                else {
                    user.lastVisited = Date.now().toString();
                    this.userDataprovider.update({ _id: user._id }, user, (error, uNum) => {
                        if (error)
                            console.error("LOGIN", error);
                        console.log('User has been updated.');
                    });
                    req.session.userId = user._id;
                    res.status(200).send({ msg: "Hello, welcome back!" });
                }
            }
        });
    }
    logout(req, res, next) {
        let session = req.session;
        if (session) {
            session.destroy(() => {
                res.status(401).send("Goodbye. See nou");
            });
        }
        else {
            res.send("You not logged in.");
        }
    }
    checkLoginSession(req, res, next) {
        let session = req.session;
        if (~['/logout', '/add'].indexOf(req.path)) {
            if (!session.userId) {
                next();
            }
            else {
                res.status(406).send();
            }
        }
        else {
            if (session.userId) {
                next();
            }
            else {
                res.status(401).send();
            }
        }
    }
}
exports.AuthController = AuthController;
