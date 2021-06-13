import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public idCliente: number;
  public idUser: number;
  public cliente:Cliente;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public clientService: ClienteService) { }

  ngOnInit(): void {
    this.idCliente = Number(localStorage.getItem('idClient'));
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.cliente = new Cliente("", "", this.idCliente, "", 0, 0, 0, this.idUser);
    this.findByIdCliente();
  }

  public findByIdCliente():void{
    this.clientService.findById(this.idCliente).subscribe(
      (cliente)=>{
      this.cliente = cliente;
    }, error => {
      this.showMsg = true;
      this.msg = error.error.message;
    }, () => {
    });
  }

  public update():void{
    this.clientService.update(this.cliente).subscribe(
      data => {
        this.showMsg = true;
        this.msg = "El cliente se edito con exito";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos actualizados con exito',
          showConfirmButton: true
        })
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
      }, () => {
      }
    );
  }

}
