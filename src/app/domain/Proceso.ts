export class Proceso {
    constructor(
        public estado:string,
        public fechaProceso:Date,
        public idProceso:number,
        public nombreProceso:string,
        public idAbogado_Abogado:number,
        public idCliente_Cliente:number,
        public idInmueble_Inmueble:number
    ){}
}