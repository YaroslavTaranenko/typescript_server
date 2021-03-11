import Nedb from "nedb";
import * as path from "path";

export default abstract class DataProvider{
    static readonly ROOT_DB_STORE = path.normalize(__dirname + "../../db/");

    protected dbstore: Nedb;

    constructor(dbstoreName = 'data'){
        this.dbstore = new Nedb({
            filename: DataProvider.ROOT_DB_STORE + dbstoreName + '.db'
        });
        this.dbstore.loadDatabase((err=>{
            this.onLoadStore(err);
        }))
    }

    protected abstract onLoadStore(err: any):void;
}