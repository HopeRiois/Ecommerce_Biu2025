
export class ManageOrderRequest {
    constructor({ idUser = 0, idProduct = 0, amount=1, isAdding= true } = {}) {
        this.idUser = idUser;
        this.idProduct = idProduct;
        this.amount = amount;
        this.isAdding = isAdding;
    }
}

export class RemoveProductRequest{
    constructor({ idOrder = 0, idOrderProduct = 0} = {}) {
        this.idOrder = idOrder;
        this.idOrderProduct = idOrderProduct;
    }
}