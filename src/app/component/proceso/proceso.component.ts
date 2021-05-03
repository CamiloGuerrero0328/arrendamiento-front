import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProcesoService } from 'src/app/service/proceso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/service/document.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Document } from 'src/app/domain/Document';
import { Proceso } from 'src/app/domain/Proceso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false , class:'modal-xl'};

  public actualUrl:string;

  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  public documentos: Document;
  public proceso:Proceso;

  public estado:boolean;
  public fecha:Date;
  public idProceso:number;
  public nombreProceso:string;
  public idAbogado:number;
  public idInmueble:number;
  public idCliete:number;
  public info:string;

  constructor(public procesoService: ProcesoService,
    public documentService:DocumentService,
    public route: Router,
    public activedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.findByIdProceso();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public mostrarDocumentos(): void {
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    console.log(id);
    this.subFindAll = this.documentService.findByIdCliente(this.idCliete).subscribe(
      data => {this.documentos = data[0];
        console.log(this.documentos);},
      error => this.msg = error.error.message
    );
  }

  public findByIdProceso():void{
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.procesoService.findById(id).subscribe(
      (proceso)=>{
        this.proceso = proceso;
        this.idCliete = proceso.idCliente_Cliente;
        console.log(this.proceso);
        this.mostrarDocumentos();
      },(error)=>{
        console.log("Hay un error"+error.error.message);
      }
    );
  }

  public actualizarProceso(): void {
    this.proceso.estado = this.estado;
    this.proceso.info = this.info;
    this.procesoService.update(this.proceso).subscribe(
      (proceso) => {
        console.log(proceso);
        this.route.navigateByUrl('abogado/lista-inmuebles-aplicados');
      }, (error) => {
        console.log("Hay un error" + error.error.message);
      }
    );
  }

  public ver(url:string, modal: TemplateRef<any>) {
    this.actualUrl = url;
    console.log(url);
    console.log(this.actualUrl);
    this.modalRef = this.modalService.show(modal, this.config);     
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.actualUrl);
    // this.modalService.open(modal);   
  }

}
