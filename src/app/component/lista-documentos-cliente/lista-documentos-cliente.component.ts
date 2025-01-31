import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { Subscription } from 'rxjs';
import { Document } from 'src/app/domain/Document';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-documentos-cliente',
  templateUrl: './lista-documentos-cliente.component.html',
  styleUrls: ['./lista-documentos-cliente.component.css']
})
export class ListaDocumentosClienteComponent implements OnInit {

  public modalRef: BsModalRef;
  config = { animated: false , class:'modal-xl'};

  public listaDocumentos: Document[];
  public subFindAll: Subscription;

  public actualUrl:string;

  public idCliente: number;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public documentService: DocumentService,
    public route: Router,
    public activedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.findByIdCliente();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findByIdCliente(): void {
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.documentService.findByIdCliente(id).subscribe(
      data => this.listaDocumentos = data,
      error => this.msg = error.error.message
    );
  }

  public ver(url:string, modal: TemplateRef<any>) {
    this.actualUrl = url;
    this.modalRef = this.modalService.show(modal, this.config);  
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.actualUrl);   
    // this.modalService.open(modal);   
  }

  }
