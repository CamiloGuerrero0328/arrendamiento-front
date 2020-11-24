import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Proceso } from 'src/app/domain/Proceso';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ProcesoService } from 'src/app/service/proceso.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';


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
  public info:string;

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
    Swal.fire('Proceso creado con exito');
  }

  public save():void{
    this.proceso = new Proceso(this.estado, this.fecha, this.idProceso, this.nombreProceso, 0, 
      this.idCliente, this.idInmueble, null, false);
    this.procesoService.save(this.proceso).subscribe(
      (proceso)=>{
        console.log(proceso);
        Swal.fire('Proceso creado con exito');
    },(error)=>{
      console.log("Hay un error"+error.error);
    });
  }

  public pagar():void{

    
    const ref = Math.random().toString(36).substring(2).toUpperCase();
    var handler = ePayco.checkout.configure({
      key: '1c778aec383303315fc4586bb7b95ee0',
      test: true
    })

    const data={
      //Parametros compra (obligatorio)
      name: "Pago estudio",
      description: "Con este pago del estudio, el abogado accedera a realizar el estudio de tus documentos.",
      invoice: ref,
      currency: "cop",
      amount: "60000",
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "en",

      //Onpage="false" - Standard="true"
      external: "false",


      //Atributos opcionales
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      // confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "https://arrendamiento-pc.web.app/cliente/response",

      //Atributos cliente
      name_billing: "Andres Perez",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",

     //atributo deshabilitación metodo de pago
    //methodsDisable: ["TDC", "PSE","SP","CASH","DP"]

      }

      handler.open(data);
  }

  public closeModal(){
    this.modalRef.hide();
  }

}
