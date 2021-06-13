import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public idUser: number;
  public idClient: number;
  public client:number;
  public mostrarRegistro:boolean = false;
  public mostrarRegistroMenu:boolean = false;
  public mostrarDocumentos:boolean = false;
  public globalEmailMostrar:string;

  constructor(public router: Router, 
              public autService:AuthService,
              public clienteService: ClienteService,
              public documentosService: DocumentService) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.client = Number(localStorage.getItem('idClient'));
    this.globalEmailMostrar = localStorage.getItem('email');
    this.validateRegister();
    this.validateRegister2();
    this.validateDocumentos();
  }

  public validateRegister(): void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        if(cliente === null){
          this.mostrarRegistro = true;
        }else{
          this.mostrarRegistro = false;
        }
      });
  }

  public validateRegister2(): void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        this.idClient = cliente.idCliente;
        localStorage.setItem('idClient', this.idClient.toString());
        if(cliente === null){
          this.mostrarRegistroMenu = false;
        }else{
          this.mostrarRegistroMenu = true;
        }
      });
  }

   public validateDocumentos():void{
    this.documentosService.findByIdCliente(this.client).subscribe(
      (documentos)=>{
        if(documentos.length === 0){
          this.mostrarDocumentos = true;
        }else{
          this.mostrarDocumentos = false;
        }
      }
    );
  }

  public singOut():void{
    this.autService.singOut()
    .then(()=>{
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      this.router.navigate(['/login']);
    })

  }

}
