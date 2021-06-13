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
import { Transaction } from 'src/app/domain/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-inmueble-aplicado',
  templateUrl: './inmueble-aplicado.component.html',
  styleUrls: ['./inmueble-aplicado.component.css']
})

export class InmuebleAplicadoComponent implements OnInit {

  public reporte: Reporte;
  public transaction: Transaction;
  public transac: Transaction[];
  public inmueble: Inmueble;

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public modalRef: BsModalRef;
  config = { animated: false };

  public showMsg: boolean = false;
  public msg: string;

  public idUser: number;
  public idcliente: number;
  public idInmueble: number;
  public idReporte: number;
  public idTransaction: number;
  public descripcion: string;
  public fecha: Date = new Date();
  public estado: boolean = false;

  public monto: number = 10000;
  public descripci: string = "Pago Mes a la fecha";

  constructor(public route: Router,
    public activedRoute: ActivatedRoute,
    public clienteService: ClienteService,
    private modalService: BsModalService,
    public inmuebleService: InmuebleService,
    public reporteService: ReporteService,
    public transactionService: TransactionService) { }

  ngOnInit(): void {
    this.idReporte = Math.floor(Math.random() * 200);
    this.idTransaction = Math.floor(Math.random() * 200);
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.insertIdCliente();
  }

  public insertIdCliente(): void {
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente) => {
        this.idcliente = cliente.idCliente;
        localStorage.setItem('idClie', this.idcliente.toString());
        this.findInmuebleAplicado();
      }, (error) => {
        console.log("Hay un error" + error.error.message);
      }
    );
  }

  public ver(idInmueble:number,modal: TemplateRef<any>){
    this.idInmueble = idInmueble;
    this.findByIdInmueble(idInmueble);
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public findByIdInmueble(idInmueble:number):void{
    this.transactionService.findByIdInmueble(idInmueble).subscribe(
      (reporte) => {
        this.transac = reporte;
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
      }
    );
  }

  public findInmuebleAplicado(): void {
    this.inmuebleService.findInmueblesAplicados(this.idcliente).subscribe(
      (inmueble) => {
        this.listaInmueble = inmueble;
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
      }
    );
  }

  public report(idInmueble: number, modal: TemplateRef<any>) {
    this.idInmueble = idInmueble;
    this.modalRef = this.modalService.show(modal, this.config);
  }

  public crear(): void {
    this.reporte = new Reporte(this.idReporte, this.descripcion, this.estado, this.idcliente, this.idInmueble);
    this.reporteService.save(this.reporte).subscribe(
      (reporte) => {
        Swal.fire('Reporte creado con exito');
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
      }, () => {
      }
    );
  }

  public closeModal() {
    this.modalRef.hide();
  }

  public pagarMes(idInmueble: number): void {
    const ref = Math.random().toString(36).substring(2).toUpperCase();
    this.inmuebleService.findById(idInmueble).subscribe(
      (data) => {
        this.monto = data.monto;
        this.idInmueble = idInmueble;
        localStorage.setItem('idInmu', this.idInmueble.toString());

        var handler = ePayco.checkout.configure({
          key: '1c778aec383303315fc4586bb7b95ee0',
          test: true
        })
        const atPayco = {
          //Parametros compra (obligatorio)
          name: "Pago Mes canon",
          description: "Pago del mes a la fecha",
          invoice: ref,
          currency: "cop",
          amount: this.monto,
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
          response: "https://arrendamiento-pc.web.app/cliente/responseMes",
          //response: "http://localhost:4200/cliente/responseMes",

          //Atributos cliente
          name_billing: "Andres Perez",
          address_billing: "Carrera 19 numero 14 91",
          type_doc_billing: "cc",
          mobilephone_billing: "3050000000",
          number_doc_billing: "100000000",

          //atributo deshabilitación metodo de pago
          //methodsDisable: ["TDC", "PSE","SP","CASH","DP"]

        }
        handler.open(atPayco);

        


      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
      }, () => {
      }
    );





  }

}
