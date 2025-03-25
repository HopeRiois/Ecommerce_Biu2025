export class Category {
    constructor({ id= 1, name = "Electrónica", description= "Productos electronicos." } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}