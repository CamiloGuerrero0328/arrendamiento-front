import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProcesoService } from 'src/app/service/proceso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proceso } from 'src/app/domain/Proceso';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/domain/Cliente';
import { Inmueble } from 'src/app/domain/Inmueble';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-arrendatario-aplicados',
  templateUrl: './arrendatario-aplicados.component.html',
  styleUrls: ['./arrendatario-aplicados.component.css']
})
export class ArrendatarioAplicadosComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false };

  public cliente:Cliente;
  public inmueble:Inmueble;
  public proceso:Proceso;

  public listaProceso: Proceso[];
  public subFindAll: Subscription;
  public idInmueble:number;

  public showMsg: boolean = false;
  public msg: string;

  public idUser:number;
  public idcliente:number;

  constructor(public inmuebleService: InmuebleService,
              public procesoService:ProcesoService,
              public route:Router,
              public activedRoute: ActivatedRoute,
              public clienteService:ClienteService,
              private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.inmueble = new Inmueble("", "", "", 0, "", 0);
    this.insertIdCliente();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public findByIdInmueble(idInmueble_Inmueble:number):void{
    this.inmuebleService.findByIdInmueble(idInmueble_Inmueble).subscribe(
      (inmueble) => {
        this.inmueble = inmueble[0];
        console.log(this.inmueble);
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
        console.log("Complete");
      }
    );
  }

  public insertIdCliente():void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idcliente = cliente.idCliente;
        console.log(this.idcliente);
        this.procesoCliente();
    },(error)=>{
      console.log("Hay un error"+error.error.message);
    }
    );
  }

  public ver(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.findByIdInmueble(idInmueble);
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public procesoCliente(): void {
    this.subFindAll = this.procesoService.findByIdCliente(this.idcliente).subscribe(
      data => this.listaProceso = data,
      error => this.msg = error.error.message
    );
  }

  public pagar(idProceso:number):void{

    localStorage.setItem('proceso',idProceso.toString());
    
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
