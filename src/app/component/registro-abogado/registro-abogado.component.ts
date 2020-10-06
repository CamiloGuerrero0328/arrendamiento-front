import { Component, OnInit } from '@angular/core';
import { AbogadoService } from 'src/app/service/abogado.service';
import { Router } from '@angular/router';
import { Abogado } from 'src/app/domain/Abogado';

@Component({
  selector: 'app-registro-abogado',
  templateUrl: './registro-abogado.component.html',
  styleUrls: ['./registro-abogado.component.css']
})
export class RegistroAbogadoComponent implements OnInit {

  public abogado: Abogado;
  public idAbogado: number;
  public nombre: string;
  public apellido: string;
  public telefono: number;
  public email: string;
  public enable: string;
  public idUsuario: number;

  constructor(public abogadoService: AbogadoService,
    public route: Router) { }

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.email = localStorage.getItem('email');
    this.idAbogado = Math.floor(Math.random() * 200);
    this.enable = 'S';
  }

  public registrarAbogado(): void {
    this.abogado = new Abogado(this.apellido, this.email, this.enable, this.idAbogado,
      this.nombre, this.telefono, this.idUsuario);
    this.abogadoService.save(this.abogado).subscribe(
      (abogado) => {
        console.log(abogado);
      }, (error) => {
        console.log("Hay un error" + error.error.message);
      }
    );
  }

}
