import DataProvider from "./DataProvider";
import User from '../entities/User';


export default class UserDataProvider extends DataProvider{
    constructor(){
        super('User');
    }

    select(where: any, onSelect: (err: any, user: User[])=>void){
        this.dbstore.find(where, onSelect);
    }
    create(data: User, onCreate: (err: any, newUser: User)=>void){
        this.dbstore.insert(data, onCreate); 
    }
    update(where: any, newData: User, onUpdate: (err: any, numReplaced: number)=>void){
        this.dbstore.update(where, {$set: newData}, {upsert: false}, onUpdate);
    }
    delete(where: any, onDelete: (err: any, numDeleted: number)=>void){
        this.dbstore.remove(where, {multi: true}, onDelete);
    }
    findOne(where: any, onSelect: (err: any, user: User)=>void){
        this.dbstore.find(where, onSelect);
    }
    protected onLoadStore(err:any):void {
        if(err !== null) console.error(err);
    }
}