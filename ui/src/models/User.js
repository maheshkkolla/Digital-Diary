import {Record} from "immutable"

export default class User extends Record({
    id: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    token: undefined
}) {

    constructor(u) {
        const user = Object.assign({}, u, {password: btoa(u.password)});
        super(user);
    }

    toApiData() {
        return JSON.stringify(this.toJS());
    }
}