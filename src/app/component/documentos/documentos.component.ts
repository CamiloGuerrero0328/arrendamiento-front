import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, } from 'rxjs/operators';
import { Document } from 'src/app/domain/Document';
import { DocumentService } from 'src/app/service/document.service';

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
  public fechaIngreso:Date;

  constructor(public storage:AngularFireStorage,
              public documentService:DocumentService) { }

  ngOnInit(): void {
  }

  public subirCedula(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCedula=url;
        }
      );
    })).subscribe();
  }

  public subirCodeudor(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCodeudor=url;
        }
      );
    })).subscribe();
  }

  public subirCarta(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlCarta=url;
        }
      );
    })).subscribe();
  }

  public subirRut(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.urlRut=url;
        }
      );
    })).subscribe();
  }

  public subirSolicitud(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().subscribe(
        (url)=>{
          console.log(url);
          this.ulrSolicitud=url;
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
      },(error)=>{
        console.log("Hay un error"+error.error.message);
      }
    );
  }

}

