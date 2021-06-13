import { Component, OnInit, TemplateRef } from '@angular/core';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/domain/Cliente';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ReporteService } from 'src/app/service/reporte.service';
import { Reporte } from 'src/app/domain/Reporte';

@Component({
  selector: 'app-lista-inmuebles-arrendador',
  templateUrl: './lista-inmuebles-arrendador.component.html',
  styleUrls: ['./lista-inmuebles-arrendador.component.css']
})
export class ListaInmueblesArrendadorComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false };

  public cliente:Cliente;
  public inmueble:Inmueble;
  public report:Reporte[];

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public idcliente:number;
  public idInmueble:number;

  public showMsg: boolean = false;
  public msg: string;

  public idUser:number;

  constructor(public inmuebleService: InmuebleService,
    public router: Router,
    public activedRoute: ActivatedRoute,
    public clienteService:ClienteService,
    private modalService: BsModalService,
    public reporteService: ReporteService) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    //this.report = new Reporte(0, " ", false, 0, 0);
    this.insertIdCliente();
    
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public insertIdCliente():void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idcliente = cliente.idCliente;
        this.inmuebleCliente();
    },(error)=>{
      console.log("Hay un error"+error.error.message);
    }
    );
  }

  public inmuebleCliente(): void {
    this.subFindAll = this.inmuebleService.findByIdCliente(this.idcliente).subscribe(
      data => this.listaInmueble = data,
      error => this.msg = error.error.message
    );
  }

  public delete(id:string):void{
    this.inmuebleService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        this.msg = "El inmueble se borro con exito";
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        this.inmuebleCliente();
        console.log("Complete");
      }
    );
  }

  public update(id:string):void{
    this.inmuebleService.update(this.inmueble).subscribe(
      data => {
        this.showMsg = true;
        this.msg = "El inmueble se edito con exito";
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        console.log("Complete");
      }
    );
  }

  public ver(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.findByIdInmueble(idInmueble);
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public findByIdInmueble(idInmueble:number):void{
    this.reporteService.findByIdInmueble(idInmueble).subscribe(
      (reporte) => {
        this.report = reporte;
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        console.log("Complete");
      }
    );
  }

  public closeModal(){
    this.modalRef.hide();
  }

}
