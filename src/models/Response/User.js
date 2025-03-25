import { Rol } from './Rol';

export class User{
    
    constructor({id = 0, firstName= "", lastName= "", userName= "", email= "", phone= "", password= "", bornDate= "", address= "", rol = new Rol()} = {}){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.bornDate = bornDate;
        this.address = address;
        this.rol = rol ? new Rol(rol) : null;
    }
}
