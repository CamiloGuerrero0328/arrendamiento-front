import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/domain/Inmueble';
import { InmuebleService } from 'src/app/service/inmueble.service';

@Component({
  selector: 'app-lista-inmueble-cliente',
  templateUrl: './lista-inmueble-cliente.component.html',
  styleUrls: ['./lista-inmueble-cliente.component.css']
})
export class ListaInmuebleClienteComponent implements OnInit {

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public idCliente:number;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService:InmuebleService,
              public router: Router,
              public activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.findByIdClient();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public findByIdClient(): void {
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.inmuebleService.findByIdCliente(id).subscribe(
      data => this.listaInmueble = data,
      error => this.msg = error.error.message
    );
  }
}
