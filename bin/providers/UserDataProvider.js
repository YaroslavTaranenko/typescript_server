"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataProvider_1 = __importDefault(require("./DataProvider"));
class UserDataProvider extends DataProvider_1.default {
    constructor() {
        super('User');
    }
    select(where, onSelect) {
        this.dbstore.find(where, onSelect);
    }
    create(data, onCreate) {
        this.dbstore.insert(data, onCreate);
    }
    update(where, newData, onUpdate) {
        this.dbstore.update(where, { $set: newData }, { upsert: false }, onUpdate);
    }
    delete(where, onDelete) {
        this.dbstore.remove(where, { multi: true }, onDelete);
    }
    findOne(where, onSelect) {
        this.dbstore.find(where, onSelect);
    }
    onLoadStore(err) {
        if (err !== null)
            console.error(err);
    }
}
exports.default = UserDataProvider;
