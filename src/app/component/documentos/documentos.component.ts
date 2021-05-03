import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, } from 'rxjs/operators';
import { Document } from 'src/app/domain/Document';
import { ClienteService } from 'src/app/service/cliente.service';
import { DocumentService } from 'src/app/service/document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  public documentos:Document;

  public idDocumentos:number;
  public idCliente:number;
  public urlCedula:string;
  public ulrSolicitud:string;
  public urlRut:string;
  public urlCarta:string;
  public urlCodeudor:string;
  public fechaIngreso:Date = new Date();

  public subidoCedula: boolean=false;
  public subidoCodeudor: boolean=false;
  public subidoCarta: boolean=false;
  public subidoRut: boolean=false;
  public subidoSolicitud: boolean=false;

  constructor(public storage:AngularFireStorage,
              public documentService:DocumentService,
              public clientService:ClienteService) { }

  ngOnInit(): void {
    this.idDocumentos = Math.floor(Math.random() * 200);
    console.log(this.idDocumentos);
    this.findByIdCliente();
  }

  public subirCedula(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}.pdf`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCedula=url;
          Swal.fire('Cedula subida con exito');
          this.subidoCedula = true;
        }
      );
    })).subscribe();
  }

  public subirCodeudor(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}.pdf`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCodeudor=url;
          Swal.fire('Codeudor subido con exito');
          this.subidoCodeudor = true;
        }
      );
    })).subscribe();
  }

  public subirCarta(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}.pdf`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCarta=url;
          Swal.fire('Carta subida con exito');
          this.subidoCarta = true;
        }
      );
    })).subscribe();
  }

  public subirRut(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}.pdf`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlRut=url;
          Swal.fire('Rut subido con exito');
          this.subidoRut = true;
        }
      );
    })).subscribe();
  }

  public subirSolicitud(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}.pdf`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.ulrSolicitud=url;
          Swal.fire('Solicitud subida con exito');
          this.subidoSolicitud = true;
        }
      );
    })).subscribe();
  }

  public guardar():void{
    this.documentos = new Document(this.urlCarta, this.urlCedula, this.urlCodeudor, this.fechaIngreso, 
      this.idDocumentos, this.urlRut, this.ulrSolicitud, this.idCliente);
    this.documentService.save(this.documentos).subscribe(
      (documentos)=>{
        console.log(documentos);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Documentos ingresados con exito',
          showConfirmButton: true
        })
      },(error)=>{
        console.log("Hay un error"+error.error);
      }
    );
  }

  public findByIdCliente(){
    this.clientService.findClientByIdUser(Number(localStorage.getItem('idUsuario'))).subscribe(
      (cliente)=>{
      this.idCliente = cliente.idCliente;
      console.log(this.idCliente);
    });
  }

}

