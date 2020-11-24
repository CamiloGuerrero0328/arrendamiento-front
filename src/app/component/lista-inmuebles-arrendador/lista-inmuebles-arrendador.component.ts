import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/domain/Cliente';

@Component({
  selector: 'app-lista-inmuebles-arrendador',
  templateUrl: './lista-inmuebles-arrendador.component.html',
  styleUrls: ['./lista-inmuebles-arrendador.component.css']
})
export class ListaInmueblesArrendadorComponent implements OnInit {

  public cliente:Cliente;

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public idcliente:number;

  public showMsg: boolean = false;
  public msg: string;

  public idUser:number;

  constructor(public inmuebleService: InmuebleService,
    public router: Router,
    public activedRoute: ActivatedRoute,
    public clienteService:ClienteService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.insertIdCliente();
    
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public insertIdCliente():void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idcliente = cliente.idCliente;
        console.log(this.idcliente);
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
        console.log("Next");
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

}
