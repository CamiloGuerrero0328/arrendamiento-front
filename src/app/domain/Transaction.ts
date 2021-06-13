export class Transaction {
    constructor(
        public descripcion:string,
        public fecha:Date,
        public idTransaction:number,
        public monto:number,
        public idCliente_Cliente:number,
        public idInmueble_Inmueble:number,
        public referencia:string,
    ){}
}