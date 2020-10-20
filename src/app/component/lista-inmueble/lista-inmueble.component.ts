import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Proceso } from 'src/app/domain/Proceso';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ProcesoService } from 'src/app/service/proceso.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/service/cliente.service';


@Component({
  selector: 'app-lista-inmueble',
  templateUrl: './lista-inmueble.component.html',
  styleUrls: ['./lista-inmueble.component.css']
})
export class ListaInmuebleComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false };

  public proceso:Proceso;
  public idProceso:number;
  public nombreProceso:string;
  public fecha:Date = new Date();
  public idCliente:number;
  public idInmueble:number;
  public estado:string = 'false';

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService:InmuebleService,
              public router: Router,
              public procesoService: ProcesoService,
              private modalService: BsModalService,
              public clientService:ClienteService) { }

  ngOnInit(): void {
    this.idProceso = Math.floor(Math.random() * 200);
    console.log('ngOnInit');
    this.findAll();
    this.findByIdCliente();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.inmuebleService.findAll().subscribe(
      data => { this.listaInmueble = data; }
    );
  }

  public findByIdCliente(){
    this.clientService.findClientByIdUser(Number(localStorage.getItem('idUsuario'))).subscribe(
      (cliente)=>{
      this.idCliente = cliente.idCliente;
      console.log(this.idCliente);
    });
  }

  public delete(id:string):void{
    this.inmuebleService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        this.msg = "El inmueble se borro con exito";
        console.log("Next");
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        this.findAll();
        console.log("Complete");
      }
    );
  }

  public aplicar(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public save():void{
    this.proceso = new Proceso(this.estado, this.fecha, this.idProceso, this.nombreProceso, 0, 
      this.idCliente, this.idInmueble);
    this.procesoService.save(this.proceso).subscribe(
      (proceso)=>{
        console.log(proceso);
    },(error)=>{
      console.log("Hay un error"+error.error.message);
    });
  }

  public closeModal(){
    this.modalRef.hide();
  }

}
