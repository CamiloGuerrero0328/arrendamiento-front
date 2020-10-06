import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/domain/Usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario:Usuario;
  public id:number;
  public email:string;
  public password:string;
  public tipoUsuario:number;

  public showMsg:Boolean=true;
  public msg:string="";

  constructor(public router:Router, 
              public authService:AuthService,
              public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.id = Math.floor(Math.random() * 200);
  }

  public register():void{
    this.usuario = new Usuario(this.password, this.email, this.id, this.tipoUsuario);
    console.log(this.usuario);
    this.authService.createUser(this.email, this.password)
    .then(()=>{
      
      this.usuarioService.save(this.usuario).subscribe(
        (usuario)=>{
          console.log(usuario);
        },(error)=>{
          console.log("Hay un error"+error.error.message);
        }
      );
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      this.showMsg=true;
      this.msg=error.message;    
    });  
  }



}
