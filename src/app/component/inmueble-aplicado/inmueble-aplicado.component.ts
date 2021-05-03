import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Subscription } from 'rxjs';
import { ReporteService } from 'src/app/service/reporte.service';
import { Reporte } from 'src/app/domain/Reporte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inmueble-aplicado',
  templateUrl: './inmueble-aplicado.component.html',
  styleUrls: ['./inmueble-aplicado.component.css']
})
export class InmuebleAplicadoComponent implements OnInit {

  public reporte:Reporte;

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public modalRef: BsModalRef;
  config = { animated: false };

  public showMsg: boolean = false;
  public msg: string;

  public idUser:number;
  public idcliente:number;
  public idInmueble:number;
  public idReporte:number;
  public descripcion:string;
  public estado:boolean = false;

  constructor(public route:Router,
    public activedRoute: ActivatedRoute,
    public clienteService:ClienteService,
    private modalService: BsModalService,
    public inmuebleService:InmuebleService,
    public reporteService: ReporteService) { }

  ngOnInit(): void {
    this.idReporte = Math.floor(Math.random() * 200);
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.insertIdCliente();
  }

  public insertIdCliente():void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idcliente = cliente.idCliente;
        console.log(this.idcliente);
        this.findInmuebleAplicado();
    },(error)=>{
      console.log("Hay un error"+error.error.message);
    }
    );
  }

  public findInmuebleAplicado():void{
    this.inmuebleService.findInmueblesAplicados(this.idcliente).subscribe(
      (inmueble) => {
        this.listaInmueble = inmueble,
        console.log(inmueble);
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        console.log("Complete");
      }
    );
  }

  public report(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public crear(): void{
    this.reporte = new Reporte(this.idReporte, this.descripcion, this.estado, this.idcliente, this.idInmueble);
    this.reporteService.save(this.reporte).subscribe(
      (reporte) => {
        console.log(reporte);
        Swal.fire('Reporte creado con exito');
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
