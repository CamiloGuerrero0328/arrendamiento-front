import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, } from 'rxjs/operators';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Cliente } from 'src/app/domain/Cliente';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-imbueble',
  templateUrl: './agregar-imbueble.component.html',
  styleUrls: ['./agregar-imbueble.component.css']
})
export class AgregarImbuebleComponent implements OnInit {

  inmuebleForm = new FormGroup({     
    direccion: new FormControl('', [Validators.required]),     
    descripcion: new FormControl('', [Validators.required]),  
    monto: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),  
    tipoInmueble: new FormControl('', [Validators.required]), 
  });

  get direccion(): AbstractControl {     
    return this.inmuebleForm.get('direccion');   
  }

  get descripcion(): AbstractControl {     
    return this.inmuebleForm.get('descripcion');   
  }

  get monto(): AbstractControl {     
    return this.inmuebleForm.get('monto');   
  }

  get tipoInmueble(): AbstractControl {     
    return this.inmuebleForm.get('tipoInmueble');   
  }

  public cliente:Cliente;

  public inmueble:Inmueble;
  public idInmueble:number;
  //public tipoInmueble=null;
  //public direccion:string;
  //public descripcion:string;
  public idcliente:number;
  public ulrImagen:string;
  //public monto:number;

  public subidoImagen: boolean=false;

  public idUser:number;

  public imgFile: File;

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
    },(error)=>{
    }
    );
  }

  public subirImagen(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    this.imgFile = file;
    const filePath = `inmuebles/imagen_${id}.jpg`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          this.ulrImagen=url;
          Swal.fire('Imagen cargada');
          this.subidoImagen = true;
        }
      );
    })).subscribe();
  }

  public crear():void{
    this.inmueble = new Inmueble(this.descripcion.value, this.direccion.value, this.ulrImagen, this.idInmueble, this.tipoInmueble.value, this.idcliente, this.monto.value);
    console.log(this.inmueble);
    this.inmuebleService.save(this.inmueble).subscribe(
      (inmueble)=>{
        Swal.fire('Inmueble creado con exito');
      },(error)=>{
        Swal.fire('Datos erroneos');
      }
    );
  }

}
