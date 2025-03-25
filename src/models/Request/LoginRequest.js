export class LoginRequest {
    constructor({ userName = "", password = "" } = {}) {
        this.userName = userName;
        this.password = password;
    }
}