import { Component, OnInit } from '@angular/core';
import { AbogadoService } from 'src/app/service/abogado.service';
import { Router } from '@angular/router';
import { Abogado } from 'src/app/domain/Abogado';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-abogado',
  templateUrl: './registro-abogado.component.html',
  styleUrls: ['./registro-abogado.component.css']
})
export class RegistroAbogadoComponent implements OnInit {

  public abogado: Abogado;
  public idAbogado: number;
  //public nombre: string;
  //public apellido: string;
  //public telefono: number;
  public email: string;
  public enable: string;
  public idUsuario: number;

  public idAbogaInmu: number;

  abogadoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
  });

  get nombre(): AbstractControl {
    return this.abogadoForm.get('nombre');
  }
  get apellido(): AbstractControl {
    return this.abogadoForm.get('apellido');
  }
  get telefono(): AbstractControl {
    return this.abogadoForm.get('telefono');
  }

  constructor(public abogadoService: AbogadoService,
    public route: Router) { }

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.email = localStorage.getItem('email');
    this.idAbogado = Math.floor(Math.random() * 200);
    this.enable = 'S';
  }

  public registrarAbogado(): void {
    this.abogado = new Abogado(this.apellido.value, this.email, this.enable, this.idAbogado,
      this.nombre.value, this.telefono.value, this.idUsuario);
    this.abogadoService.save(this.abogado).subscribe(
      (abogado) => {
        this.idAbogaInmu = abogado.idAbogado;
        localStorage.setItem('idAbogado', this.idAbogaInmu.toString());
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro como abogado creado con exito',
          showConfirmButton: true
        })
        window.location.replace("/abogado");
      }, (error) => {
        console.log("Hay un error" + error.error);
      }
    );
  }

}
