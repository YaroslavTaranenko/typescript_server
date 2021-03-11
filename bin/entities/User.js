"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, email, password, _id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this._id = _id;
        let date = Date.now().toString();
        this.created = date;
        this.lastVisited = date;
    }
}
exports.default = User;
