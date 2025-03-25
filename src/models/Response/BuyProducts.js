import { Product } from "./Product";

export class BuyProducts {
    constructor({ product = new Product(), quantity = 1 } = {}) {
        this.product = product;
        this.quantity = quantity;
    }
}