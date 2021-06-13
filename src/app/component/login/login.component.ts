import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/Usuario';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  public idUser:number;
  public idU:number;
  public showMsg = false;
  public msg = '';
  // public email:string;
  // public password:string;

  public idEmail:string;

  constructor(public usuarioService:UsuarioService,
              public authService:AuthService,
              public router:Router) { }

  ngOnInit(): void {
    
  }

  public login():void{
    this.authService.loginWithEmilPassword(this.email.value, this.password.value).then(
      (value)=>{console.log(value);
        this.usuarioService.findByEmail(this.email.value).subscribe((usuario)=>{
          this.idUser =  usuario.idTipoUsuario;
          this.idU = usuario.idUsuario;
          this.idEmail = usuario.correoElectronico;
          localStorage.setItem('idUsuario', this.idU.toString());
          localStorage.setItem('email', this.idEmail);
          this.routing();
        },error => {
          this.msg = error.error;
          this.showMsg = true;
        });
      },error => {
        // this.msg = error.error;
        // this.showMsg = true;
        // console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: true
        });
      }
    )
  }

  public routing() {
    localStorage.setItem('idUser', String(this.idUser));
    if (this.idUser === 1) {
      this.router.navigate(['/cliente']);
    } else if (this.idUser === 2) {
      this.router.navigate(['/abogado']);   
    } else if (this.idUser === 3){
      this.router.navigate(['/administrador']);
    }
  }

}
