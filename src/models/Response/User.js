import { Rol } from './Rol';
import { v4 as uuidv4 } from 'uuid';

export class User{
    
    constructor({id = uuidv4(), firstName= "", lastName= "", userName= "", email= "", phone= "", password= "", bornDate= "", address= "", rol = new Rol()} = {}){
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
