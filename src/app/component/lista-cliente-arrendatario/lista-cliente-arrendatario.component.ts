import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/domain/Cliente';

@Component({
  selector: 'app-lista-cliente-arrendatario',
  templateUrl: './lista-cliente-arrendatario.component.html',
  styleUrls: ['./lista-cliente-arrendatario.component.css']
})
export class ListaClienteArrendatarioComponent implements OnInit {

  public listaCliente: Cliente[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public clienteService:ClienteService,
              public router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.clienteService.findAll().subscribe(
      data => { this.listaCliente = data; }
    );
  }


}
