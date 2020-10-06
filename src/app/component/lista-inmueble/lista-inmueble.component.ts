import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inmueble } from 'src/app/domain/Inmueble';
import { InmuebleService } from 'src/app/service/inmueble.service';

@Component({
  selector: 'app-lista-inmueble',
  templateUrl: './lista-inmueble.component.html',
  styleUrls: ['./lista-inmueble.component.css']
})
export class ListaInmuebleComponent implements OnInit {

  public listaInmueble: Inmueble[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService:InmuebleService,
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
    this.subFindAll = this.inmuebleService.findAll().subscribe(
      data => { this.listaInmueble = data; }
    );
  }

}
