import { Category } from "./Category";

export class Product {
    constructor({ id= 0, name = "", description="", productType="", value=0, img="", category = new Category() } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.productType = productType;
        this.value = value;
        this.img = img;
        this.category = category ? new Category(category) : null;
    }
}