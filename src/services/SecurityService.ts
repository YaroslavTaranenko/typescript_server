import * as crypto from "crypto";

export default class SecurityService{
    static generatePasswordHash(password: string):string{
        let secureWord = "typescript";
        return crypto.createHmac('sha1', secureWord).update(password).digest('hex');
    }

    static validatePassword(password: string, hash: string):boolean{
        return SecurityService.generatePasswordHash(password) == hash;
    }
}