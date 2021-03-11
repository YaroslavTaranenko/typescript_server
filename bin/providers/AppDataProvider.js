"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataProvider_1 = __importDefault(require("./UserDataProvider"));
class AppDataProvider {
    constructor() {
        this.storage = this.getProviders();
    }
    getInstanceProvider(type) {
        let items = this.storage.filter(provider => {
            if (provider instanceof type)
                return provider;
        });
        return items.length > 0 ? items[0] : null;
    }
    get user() {
        return this.getInstanceProvider(UserDataProvider_1.default);
    }
    getProviders() {
        return [UserDataProvider_1.default];
    }
}
exports.default = AppDataProvider;
