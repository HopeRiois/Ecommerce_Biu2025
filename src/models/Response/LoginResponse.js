export class LoginResponse {
    constructor({ idUser =0 ,userName = "", email = "", role="", jwt ="", expirationTime=0 } = {}) {
        this.idUser = idUser;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.jwt = jwt;
        this.expirationTime = expirationTime;
    }
}