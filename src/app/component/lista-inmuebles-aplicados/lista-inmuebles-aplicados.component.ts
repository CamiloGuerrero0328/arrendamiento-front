import { Component, OnInit } from '@angular/core';
import { ProcesoService } from 'src/app/service/proceso.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proceso } from 'src/app/domain/Proceso';

@Component({
  selector: 'app-lista-inmuebles-aplicados',
  templateUrl: './lista-inmuebles-aplicados.component.html',
  styleUrls: ['./lista-inmuebles-aplicados.component.css']
})
export class ListaInmueblesAplicadosComponent implements OnInit {

  public listaProceso: Proceso[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public procesoService:ProcesoService,
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
    this.subFindAll = this.procesoService.findAll().subscribe(
      data => { this.listaProceso = data; }
    );
  }

}
