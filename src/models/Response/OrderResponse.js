import { User } from './User';
import { Product } from './Product';

export class Order {
    constructor({ id = 0, orderDate = "", status="", user= new User(), orderProducts = [new OrderProduct()]} = {}) {
        this.id = id;
        this.orderDate = orderDate;
        this.status = status;
        this.user = user;
        this.orderProducts = orderProducts;
    }
}

export class OrderProduct{
    constructor({ id = 0, idOrder = 0, product = new Product(), amount = 0} = {}) {
        this.id = id;
        this.idOrder = idOrder;
        this.product = product;
        this.amount = amount;
    }
}