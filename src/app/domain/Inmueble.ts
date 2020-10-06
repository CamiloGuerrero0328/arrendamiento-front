export class Inmueble{
    constructor(
        public descripcion:string,
        public direccion:string,
        public idInmueble:number,
        public tipoInmueble:string,
        public idCliente:number
    ){}
}