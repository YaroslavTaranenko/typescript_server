"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("../App"));
const AuthController_1 = require("../controllers/AuthController");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRoute = {
    createRoute(router) {
        let app = App_1.default.getInstance();
        let AuthCtrl = new AuthController_1.AuthController(app);
        let UserCtrl = new UserController_1.default(app);
        return router()
            .use(AuthCtrl.checkLoginSession)
            .get('/', (req, res) => {
            UserCtrl.findAll((err, data) => {
                res.send({ users: data });
            });
        })
            .post('/add', (req, res) => {
            if (!req.body) {
                res.status(400).send({ msg: "Empty body request", code: 400 });
            }
            else {
                UserCtrl.create(req.body, (newData) => {
                    res.status(200).send({ userCreated: newData });
                }, (msg, code) => {
                    res.status(code).send({ msg: msg, code: code });
                });
            }
        })
            .post('/login', (req, res) => {
            if (!req.body) {
                res.status(400).send({ msg: "Empty body request", code: 400 });
            }
            else {
                AuthCtrl.login(req, res);
            }
        })
            .get('/logout', AuthCtrl.logout);
    }
};
exports.default = UserRoute;
