export class MakeSaleRequest{
    constructor({ idOrder = 0, idUser = 0} = {}) {
        this.idOrder = idOrder;
        this.idUser = idUser;
    }
}