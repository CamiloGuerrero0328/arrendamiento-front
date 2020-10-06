export class Cliente{
    constructor(
        public apellidoCliente:string,
        public documento:string,
        public idCliente:number,
        public nombreCliente:string,
        public telefonoCliente:number,
        public idTipoCliente_TipoCliente:number,
        public idTipoDocumento_TipoDocumento:number,
        public idUsuario_Usuario:number
    ){}
}