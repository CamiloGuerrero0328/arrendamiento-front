import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/domain/Usuario';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm = new FormGroup({     
    email: new FormControl('', [Validators.required, Validators.email]),     
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),   
  });

  get email(): AbstractControl {     
    return this.loginForm.get('email');   
  }

  get password(): AbstractControl {     
    return this.loginForm.get('password');   
  }

  public usuario:Usuario;
  public id:number;
  // public email:string;
  // public password:string;
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
    this.usuario = new Usuario(this.password.value, this.email.value, this.id, 1);
    this.authService.createUser(this.email.value, this.password.value)
    .then(()=>{
      this.usuarioService.save(this.usuario).subscribe(
        (usuario)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado con exito',
            showConfirmButton: true
          })
        },(error)=>{
          // this.showMsg=true;
          // this.msg="Correo duplicado, o mal formato del correo"; 
          // console.log("Hay un error"+error.error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.message,
            showConfirmButton: true
          })
        }
      );
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      // this.showMsg=true;
      // this.msg="Correo duplicado, o mal formato del correo";   
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.message,
        showConfirmButton: true
      }) 
    });  
  }



}
