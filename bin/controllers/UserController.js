"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
class UserController {
    constructor(app) {
        this.app = app;
        this.userProvider = app.providers.user;
    }
    findAll(onLoad) {
        this.userProvider.select({}, onLoad);
    }
    findByEmail(email, onLoad, onError) {
        this.userProvider.findOne({ email: email }, (err, data) => {
            if (err) {
                onError(err.message, 500);
            }
            else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }
    create(data, onCreate, onError) {
        let emailPattern = /^[a-z0-9_-]{4, }\@ [-a-z0-9]{3, }\.[a-z]{2,3}$/;
        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("Incorrect password or email", 400);
        }
        else {
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new User_1.default(data.name, data.email, SecurityService_1.default.generatePasswordHash(data.password));
                    this.userProvider.create(user, (err, newData) => {
                        if (err) {
                            onError(err.message, 500);
                        }
                        else {
                            onCreate(newData);
                        }
                    });
                }
                else {
                    onError("User alredy exists.", 400);
                }
            }, onError);
        }
    }
    removeById(id, onRemove) {
        this.userProvider.delete({ _id: id }, onRemove);
    }
    updateById(id, newData, onUpdate) {
        this.userProvider.update({ _id: id }, newData, onUpdate);
    }
}
exports.default = UserController;
