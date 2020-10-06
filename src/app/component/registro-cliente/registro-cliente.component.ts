import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/Cliente';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public cliente: Cliente;
  public idUser: number;
  public id: number;
  public nombre: string;
  public apellido: string;
  public telefono: number;
  public tipoDocumento: number;
  public documento: string;
  public tipoCliente: number;

  public idClienInmu: number;

  constructor(public clienteService: ClienteService,
    public route: Router) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    console.log(this.idUser);
    this.id = Math.floor(Math.random() * 200);
  }

  public registerCliente(): void {
    this.cliente = new Cliente(this.apellido, this.documento, this.id, this.nombre, this.telefono,
      this.tipoCliente, this.tipoDocumento, this.idUser);
    this.clienteService.save(this.cliente).subscribe(
      (cliente) => {
        this.idClienInmu = cliente.idCliente;
        localStorage.setItem('idUsuario', this.idClienInmu.toString());
        console.log(cliente);
      }, (error) => {
        console.log("Hay un error" + error.error.message);
      }
    );
  }

}
