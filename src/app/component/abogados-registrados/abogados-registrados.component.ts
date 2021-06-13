import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/domain/Cliente';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AbogadoService } from 'src/app/service/abogado.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-abogados-registrados',
  templateUrl: './abogados-registrados.component.html',
  styleUrls: ['./abogados-registrados.component.css']
})
export class AbogadosRegistradosComponent implements OnInit {

  public listaAboagdo: Cliente[];
  public subFindAll: Subscription;

  public idAboga:number;
  public idUse:number;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public usuarioService: UsuarioService,
              public abogadoService: AbogadoService,
              public authService: AuthService,
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
    this.subFindAll = this.usuarioService.findByTipoUsuario(2).subscribe(
      data => { this.listaAboagdo = data; }
    );
  }

  public deleteAbogado(id:number):void{
    this.abogadoService.findAbogadoByIdUser(id).subscribe(
      data=> {
        this.idAboga = data.idAbogado;
        this.abogadoService.delete(this.idAboga).subscribe(
          data=>{
            this.delete(id);
          }, error => {
            this.showMsg = true;
            this.msg = error.error.message;
          }
        );
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
      }
    );
  }

  public delete(id:number):void{
    this.usuarioService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        Swal.fire('El Abogado se borro con exito');
        this.findAll();
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
      }
    );
  }

}
