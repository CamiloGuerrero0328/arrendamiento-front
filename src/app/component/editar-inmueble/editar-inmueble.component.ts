import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/service/inmueble.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/domain/Cliente';
import { Inmueble } from 'src/app/domain/Inmueble';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  public params = this.activedRoute.params['_value'];

  public subFindAll: Subscription;
  public cliente:Cliente;
  public inmueble:Inmueble;

  public idcliente:number;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public inmuebleService: InmuebleService,
              public router: Router,
              public activedRoute: ActivatedRoute,
              public clienteService:ClienteService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.inmueble = new Inmueble("", "", "", this.params.id, "", 0, 0);
    this.findByIdInmueble();
  }

  public findByIdInmueble():void{
    this.inmuebleService.findByIdInmueble(this.params.id).subscribe(
      (inmueble) => {
        this.inmueble = inmueble[0];
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
      }
    );
  }

  public update():void{
    this.inmuebleService.update(this.inmueble).subscribe(
      data => {
        this.showMsg = true;
        this.msg = "El inmueble se edito con exito";
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log("Error");
      }, () => {
      }
    );
  }

}
