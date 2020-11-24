import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/Cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.css']
})
export class MostrarClienteComponent implements OnInit {

  public cliente:Cliente = new Cliente('', '', 0, '', 0, 0, 0, 0);

  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public clienteService:ClienteService,
              public route: Router,
              public activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mostrarcliente();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public mostrarcliente():void{
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.clienteService.findById(id).subscribe(
      data => {this.cliente = data;
      console.log(data);},
      error => this.msg = error.error.message
    );
  }

}
