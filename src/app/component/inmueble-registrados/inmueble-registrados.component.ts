import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inmueble-registrados',
  templateUrl: './inmueble-registrados.component.html',
  styleUrls: ['./inmueble-registrados.component.css']
})
export class InmuebleRegistradosComponent implements OnInit {

  public usuario:Usuario;
  public email: string;
  public password: string;
  public idUser: number;

  public showMsg:Boolean=true;
  public msg:string="";

  constructor(public usuarioService: UsuarioService,
              public authService:AuthService,
              public route: Router) { }

  ngOnInit(): void {
    this.idUser = Math.floor(Math.random() * 200);
  }

  public registerCuenta():void{
    this.usuario = new Usuario(this.password, this.email,this.idUser, 2);
    this.authService.createUser(this.email, this.password).then(
      ()=>{
        this.usuarioService.save(this.usuario).subscribe( 
          (usuario)=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario de abogado creado con exito',
              showConfirmButton: true
            })
          }, (error) => {
            console.log("Hay un error" + error.error.message);
          }
        );
      }).catch(error=>{
        this.showMsg=true;
        this.msg=error;   
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Credenciales Incorrectas',
          showConfirmButton: true
        }) 
      });
    
    
  }

}
