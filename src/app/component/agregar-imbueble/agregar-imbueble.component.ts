import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Cliente } from 'src/app/domain/Cliente';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-agregar-imbueble',
  templateUrl: './agregar-imbueble.component.html',
  styleUrls: ['./agregar-imbueble.component.css']
})
export class AgregarImbuebleComponent implements OnInit {

  public cliente:Cliente;

  public inmueble:Inmueble;
  public idInmueble:number;
  public tipoInmueble:string;
  public direccion:string;
  public descripcion:string;
  public idcliente:number;

  public idUser:number;

  public showMsg:Boolean=true;
  public msg:string="";

  constructor(public router:Router,
              public inmuebleService:InmuebleService,
              public clienteService:ClienteService) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    
    this.idInmueble = Math.floor(Math.random() * 1000);

    this.insertIdCliente();
  }

  public insertIdCliente():void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idcliente = cliente.idCliente;
        console.log(this.idcliente);
    },(error)=>{
      console.log("Hay un error"+error.error.message);
    }
    );
  }

  public crear():void{
    this.inmueble = new Inmueble(this.descripcion, this.direccion, this.idInmueble, this.tipoInmueble, this.idcliente);
    this.inmuebleService.save(this.inmueble).subscribe(
      (inmueble)=>{
        console.log(inmueble);
      },(error)=>{
        console.log("Hay un error"+error.error.message);
      }
    );
  }

}
