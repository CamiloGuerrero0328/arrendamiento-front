import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/domain/Inmueble';
import { InmuebleService } from 'src/app/service/inmueble.service';

@Component({
  selector: 'app-lista-inmueble-full',
  templateUrl: './lista-inmueble-full.component.html',
  styleUrls: ['./lista-inmueble-full.component.css']
})
export class ListaInmuebleFullComponent implements OnInit {

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public idInmueble:number;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService:InmuebleService,
              public router: Router,
              public activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.findById();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findById(): void {
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.inmuebleService.findByIdInmueble(id).subscribe(
      data => this.listaInmueble = data,
      error => this.msg = error.error.message
    );
  }

}
