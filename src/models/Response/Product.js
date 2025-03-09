import { v4 as uuidv4 } from 'uuid';

export class Product {
    constructor({ id= uuidv4(), nombre = "", descripcion="", categoria="", valor=0, img="" } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.valor = valor;
        this.img = img;
    }
}