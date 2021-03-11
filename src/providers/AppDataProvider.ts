import DataProvider from "./DataProvider";
import UserDataProvider from "./UserDataProvider";

export default class AppDataProvider{
    private storage: DataProvider[];

    constructor() {
        this.storage = this.getProviders();
    }
    getInstanceProvider(type: any):any | null{
        let items = this.storage.filter(provider=>{
            if(provider instanceof type) return provider;
        })
        return items.length > 0 ? items[0] : null;
    }
    get user(): UserDataProvider{
        return this.getInstanceProvider(UserDataProvider);
    }
    private getProviders():any[]{
        return [UserDataProvider]
    }
}