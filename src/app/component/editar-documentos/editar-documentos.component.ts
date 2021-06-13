import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ClienteService } from 'src/app/service/cliente.service';
import { DocumentService } from 'src/app/service/document.service';
import { finalize, } from 'rxjs/operators';
import { Document } from 'src/app/domain/Document';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {

  public documento: Document;

  public idClie:number;

  public idDocumentos: number;
  public idCliente: number;
  public urlCedula: string;
  public ulrSolicitud: string;
  public urlRut: string;
  public urlCarta: string;
  public urlCodeudor: string;
  public fechaIngreso: Date = new Date();

  public subidoCedula: boolean = false;
  public subidoCodeudor: boolean = false;
  public subidoCarta: boolean = false;
  public subidoRut: boolean = false;
  public subidoSolicitud: boolean = false;

  constructor(
    public documentService: DocumentService,
    public clientService: ClienteService,
    private angularFireStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.idClie = Number(localStorage.getItem('idClient'));
    this.vistaDocumentos();
  }


  public vistaDocumentos():void{
    this.documentService.findByIdCliente(this.idClie).subscribe(
      (documentos)=>{
        this.documento = documentos[0];
      }
    );
  }

  public borrarDocumentoCodeudor(url:string):void{
    this.documento.codeudor = null;
    this.angularFireStorage.storage.refFromURL(url).delete();
    this.documentService.update(this.documento).subscribe(
      (documento)=>{
      }
    );
  }

  public agregarDocumentoCodeudor(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/codeudor_${id}.pdf`;
    const ref = this.angularFireStorage.storage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().then(
        (url)=>{
          this.urlCodeudor=url;
          this.documento.codeudor = this.urlCodeudor;
          this.documentService.update(this.documento).subscribe(
            (documentos)=>{
            }
          );
        }
      );
    })).subscribe();
  }

  public borrarDocumentoRut(url:string):void{
    this.documento.rut = null;
    this.angularFireStorage.storage.refFromURL(url).delete();
    this.documentService.update(this.documento).subscribe(
      (documento)=>{
      }
    );
  }

  public agregarDocumentoRut(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/rut_${id}.pdf`;
    const ref = this.angularFireStorage.storage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().then(
        (url)=>{
          this.urlRut=url;
          this.documento.rut = this.urlRut;
          this.documentService.update(this.documento).subscribe(
            (documentos)=>{
            }
          );
        }
      );
    })).subscribe();
  }

  public borrarDocumentoCartaLaboral(url:string):void{
    this.documento.cartaLaboral = null;
    this.angularFireStorage.storage.refFromURL(url).delete();
    this.documentService.update(this.documento).subscribe(
      (documento)=>{
      }
    );
  }

  public agregarDocumentoCartaLaboral(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/cartaLaboral_${id}.pdf`;
    const ref = this.angularFireStorage.storage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().then(
        (url)=>{
          this.urlCarta=url;
          this.documento.cartaLaboral = this.urlCarta;
          this.documentService.update(this.documento).subscribe(
            (documentos)=>{
            }
          );
        }
      );
    })).subscribe();
  }

  public borrarDocumentoCedula(url:string):void{
    this.documento.cedulaCiudadania = null;
    this.angularFireStorage.storage.refFromURL(url).delete();
    this.documentService.update(this.documento).subscribe(
      (documento)=>{
      }
    );
  }

  public agregarDocumentoCedula(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/cedula_${id}.pdf`;
    const ref = this.angularFireStorage.storage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().then(
        (url)=>{
          this.urlCedula=url;
          this.documento.cedulaCiudadania = this.urlCedula;
          this.documentService.update(this.documento).subscribe(
            (documentos)=>{
            }
          );
        }
      );
    })).subscribe();
  }

  public borrarDocumentoSolicitud(url:string):void{
    this.documento.solicitudArrendamiento = null;
    this.angularFireStorage.storage.refFromURL(url).delete();
    this.documentService.update(this.documento).subscribe(
      (documento)=>{
      }
    );
  }

  public agregarDocumentoSolicitud(e:any):void{
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `documentos/solicitudArrendamiento_${id}.pdf`;
    const ref = this.angularFireStorage.storage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{
      ref.getDownloadURL().then(
        (url)=>{
          this.ulrSolicitud=url;
          this.documento.solicitudArrendamiento = this.ulrSolicitud;
          this.documentService.update(this.documento).subscribe(
            (documentos)=>{
            }
          );
        }
      );
    })).subscribe();
  }

}
