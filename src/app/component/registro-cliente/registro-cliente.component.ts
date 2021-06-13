import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/Cliente';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public cliente: Cliente;
  public idUser: number;
  public id: number;
  //public nombre: string;
  //public apellido: string;
  //public telefono: number;
  //public tipoDocumento = 0;
  //public documento: string;
  //public tipoCliente = 0;

  public idClienInmu: number;

  clienteForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    tipoDocumento: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    tipoCliente: new FormControl('', [Validators.required]),
  });

  get nombre(): AbstractControl {
    return this.clienteForm.get('nombre');
  }
  get apellido(): AbstractControl {
    return this.clienteForm.get('apellido');
  }
  get telefono(): AbstractControl {
    return this.clienteForm.get('telefono');
  }
  get tipoDocumento(): AbstractControl {
    return this.clienteForm.get('tipoDocumento');
  }
  get documento(): AbstractControl {
    return this.clienteForm.get('documento');
  }
  get tipoCliente(): AbstractControl {
    return this.clienteForm.get('tipoCliente');
  }

  constructor(public clienteService: ClienteService,
    public route: Router) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.id = Math.floor(Math.random() * 800);
  }

  changeClient(e) { 
    console.log(e.target)     
    this.tipoCliente.setValue(e.target.value, { onlySelf: true }) 
  }

  public registerCliente(): void {
    this.cliente = new Cliente(this.apellido.value, this.documento.value, this.id, this.nombre.value, this.telefono.value,
      this.tipoCliente.value, this.tipoDocumento.value, this.idUser);
    this.clienteService.save(this.cliente).subscribe(
      (cliente) => {
        this.idClienInmu = cliente.idCliente;
        localStorage.setItem('idCliente', this.idClienInmu.toString());
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro como cliente creado con exito',
          showConfirmButton: true
        })
        window.location.replace("/cliente");
      }, (error) => {
        console.log("Hay un error" + error.error.message);
      }
    );
  }

}
