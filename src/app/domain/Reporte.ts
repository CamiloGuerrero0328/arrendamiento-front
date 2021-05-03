export class Reporte {
    constructor(
        public idReporte:number,
        public descripcion:string,
        public estado:boolean,
        public idCliente_Cliente:number,
        public idInmueble_Inmueble:number,
    ){}
}