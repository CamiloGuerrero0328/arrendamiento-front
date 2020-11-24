import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public idUser: number;
  public mostrarRegistro:boolean = false;

  constructor(public router: Router, public autService:AuthService,public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUsuario'));
    this.validateRegister();
  }

  public validateRegister(): void{
    this.clienteService.findClientByIdUser(this.idUser).subscribe(
      (cliente)=>{
        console.log(cliente);
        if(cliente === null){
          this.mostrarRegistro = true;
        }else{
          this.mostrarRegistro = false;
        }
      });
  }

  public singOut():void{
    this.autService.singOut()
    .then(()=>{
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      this.router.navigate(['/login']);
    })

  }

}
