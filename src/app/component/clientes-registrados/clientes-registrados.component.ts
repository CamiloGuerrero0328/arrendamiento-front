import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/domain/Cliente';

@Component({
  selector: 'app-clientes-registrados',
  templateUrl: './clientes-registrados.component.html',
  styleUrls: ['./clientes-registrados.component.css']
})
export class ClientesRegistradosComponent implements OnInit {

  public listaCliente: Cliente[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public clienteService: ClienteService,
    public router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.findAll();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.clienteService.findAll().subscribe(
      data => { this.listaCliente = data; }
    );
  }

}
