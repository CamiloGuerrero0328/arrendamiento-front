import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Inmueble } from 'src/app/domain/Inmueble';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Proceso } from 'src/app/domain/Proceso';
import { ProcesoService } from 'src/app/service/proceso.service';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta-inmueble',
  templateUrl: './tarjeta-inmueble.component.html',
  styleUrls: ['./tarjeta-inmueble.component.css']
})
export class TarjetaInmuebleComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false };

  public proceso:Proceso;

  public idProceso:number;
  public nombreProceso:string;
  public fecha:Date = new Date();
  public idCliente:number;
  public idInmueble:number;
  public estado:string = 'false';

  public Inmueble:Inmueble;
  @Input() inmueble: Inmueble;

  constructor(private modalService: BsModalService,
              public procesoService: ProcesoService,
              public clientService:ClienteService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.idProceso = Math.floor(Math.random() * 200);
    this.findByIdCliente();
  } 

  public findByIdCliente(){
    this.clientService.findClientByIdUser(Number(localStorage.getItem('idUsuario'))).subscribe(
      (cliente)=>{
      this.idCliente = cliente.idCliente;
      console.log(this.idCliente);
    });
  }

  public aplicar(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.modalRef = this.modalService.show(modal, this.config);
    Swal.fire('Proceso creado con exito');
  }

  public save():void{
    this.proceso = new Proceso(false, this.fecha, this.idProceso, this.nombreProceso, 0, 
      this.idCliente, this.idInmueble, null, false);
    this.procesoService.save(this.proceso).subscribe(
      (proceso)=>{
        console.log(proceso);
        Swal.fire('Proceso creado con exito');
    },(error)=>{
      console.log("Hay un error"+error.error);
    });
  }

  public closeModal(){
    this.modalRef.hide();
  }
}
