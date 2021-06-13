import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbogadoService } from 'src/app/service/abogado.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-abogado',
  templateUrl: './abogado.component.html',
  styleUrls: ['./abogado.component.css']
})
export class AbogadoComponent implements OnInit {

  public idUser: number;
  public mostrarRegistro: boolean = false;
  public mostrarRegistroMenu: boolean = false;
  public globalEmailMostrar: string;
  public idAboga: number;

  constructor(public router: Router, public autService: AuthService, public abogadoService: AbogadoService) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.globalEmailMostrar = localStorage.getItem('email');
    this.validateRegister();
    this.validateRegister2();
  }

  public validateRegister(): void {
    this.abogadoService.findAbogadoByIdUser(this.idUser).subscribe(
      (abogado) => {
        this.idAboga = abogado.idAbogado;
        localStorage.setItem('idAboga', this.idAboga.toString());
        if (abogado === null) {
          this.mostrarRegistro = true;
        } else {
          this.mostrarRegistro = false;
        }
      });
  }

  public validateRegister2(): void {
    this.abogadoService.findAbogadoByIdUser(this.idUser).subscribe(
      (abogado) => {
        if (abogado === null) {
          this.mostrarRegistroMenu = false;
        } else {
          this.mostrarRegistroMenu = true;
        }
      });
  }

  public singOut(): void {
    this.autService.singOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.router.navigate(['/login']);
      })

  }

}
