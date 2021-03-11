import App from "../App";
import User from "../entities/User";
import UserDataProvider from "../providers/UserDataProvider";
import SecurityService from "../services/SecurityService";

export default class UserController{
    private userProvider: UserDataProvider;

    constructor(private app: App){
        this.userProvider = app.providers.user;
    }

    findAll(onLoad: (err: string, data: User[])=>void){
        this.userProvider.select({}, onLoad);
    }
    findByEmail(email: string, onLoad:(data: User | null)=>void, onError:(msg: string, code: number)=>void){
        this.userProvider.findOne({email: email}, (err, data)=>{
            if(err){
                onError(err.message, 500);
            }else{
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }

    create(data: any, onCreate: any, onError: (msg: string, code: number)=> void){
        let emailPattern = /^[a-z0-9_-]{4, }\@ [-a-z0-9]{3, }\.[a-z]{2,3}$/;

        if(!emailPattern.test(data.email) || !data.password.length){
            onError("Incorrect password or email", 400);
        }else{
            this.findByEmail(data.email, (result)=>{
                if(!result){
                    let user = new User(data.name, data.email, SecurityService.generatePasswordHash(data.password));

                    this.userProvider.create(user, (err, newData)=>{
                        if(err){
                            onError(err.message, 500);
                        }else{
                            onCreate(newData);
                        }
                    });
                }else{
                    onError("User alredy exists.", 400);
                }
            }, onError);
        }
    }

    removeById(id: string, onRemove: any){
        this.userProvider.delete({_id: id}, onRemove);
    }
    updateById(id: string, newData: User, onUpdate: any){
        this.userProvider.update({_id: id}, newData, onUpdate);
    }
}