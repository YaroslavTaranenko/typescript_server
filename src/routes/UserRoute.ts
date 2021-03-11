import App from "../App";
import IAppRoute from "../configs/IAppRoute";
import { AuthController } from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import { Request, Response } from "express";


const UserRoute: IAppRoute = {
    createRoute(router: any){
        let app = App.getInstance();

        let AuthCtrl = new AuthController(app);
        let UserCtrl = new UserController(app);

        return router()
            .use(AuthCtrl.checkLoginSession)
            .get('/', (req: Request, res: Response)=>{
                UserCtrl.findAll((err, data)=>{
                    res.send({users: data});
                });
            })
            .post('/add', (req: Request, res: Response)=>{
                if(!req.body){
                    res.status(400).send({msg: "Empty body request", code: 400});
                }else{
                    UserCtrl.create(req.body, (newData: any)=>{
                        res.status(200).send({userCreated: newData});
                    }, (msg, code)=>{
                        res.status(code).send({msg: msg, code: code});
                    });
                }
            })
            .post('/login', (req: Request, res: Response)=>{
                if(!req.body){
                    res.status(400).send({msg: "Empty body request", code: 400});
                }else{
                    AuthCtrl.login(req, res);
                }
            })
            .get('/logout', AuthCtrl.logout);
    }
}
export default UserRoute;