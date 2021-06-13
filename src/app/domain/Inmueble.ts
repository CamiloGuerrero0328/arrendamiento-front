export class Inmueble{
    constructor(
        public descripcion:string,
        public direccion:string,
        public imagen:string,
        public idInmueble:number,
        public tipoInmueble:string,
        public idCliente:number,
        public monto:number,
    ){}
}