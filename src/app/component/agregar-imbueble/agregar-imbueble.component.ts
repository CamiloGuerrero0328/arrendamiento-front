import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, } from 'rxjs/operators';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Cliente } from 'src/app/domain/Cliente';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

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
  public ulrImagen:string;

  public idUser:number;

  public showMsg:Boolean=true;
  public msg:string="";

  constructor(public router:Router,
              public inmuebleService:InmuebleService,
              public clienteService:ClienteService,
              public storage:AngularFireStorage) { }

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
      console.log("Hay un error"+error.error);
    }
    );
  }

  public subirImagen(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `inmuebles/imagen_${id}.jpg`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.ulrImagen=url;
        }
      );
    })).subscribe();
  }

  public crear():void{
    this.inmueble = new Inmueble(this.descripcion, this.direccion, this.ulrImagen, this.idInmueble, this.tipoInmueble, this.idcliente);
    this.inmuebleService.save(this.inmueble).subscribe(
      (inmueble)=>{
        Swal.fire('Inmueble creado con exito');
        console.log(inmueble);
      },(error)=>{
        console.log("Hay un error"+error.error);
        Swal.fire('Creacion de inmueble fallida');
      }
    );
  }

}
