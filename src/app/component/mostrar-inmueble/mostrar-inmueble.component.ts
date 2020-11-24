import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/domain/Inmueble';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mostrar-inmueble',
  templateUrl: './mostrar-inmueble.component.html',
  styleUrls: ['./mostrar-inmueble.component.css']
})
export class MostrarInmuebleComponent implements OnInit {

  public inmueble:Inmueble = new Inmueble('', '', 0, '', 0);

  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService:InmuebleService,
              public route: Router,
              public activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mostrarinmueble();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.subFindAll.unsubscribe();
  }

  public mostrarinmueble():void {
    const params = this.activedRoute.params[`_value`];
    const id = params.id;
    this.subFindAll = this.inmuebleService.findById(id).subscribe(
      data => {this.inmueble = data;
      console.log(data);},
      error => this.msg = error.error.message
    );
  }

}
