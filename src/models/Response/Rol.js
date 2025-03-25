export class Rol {
    constructor({ id= 2, name = "client", description= "rol cliente del sistema" } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}