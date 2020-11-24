import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public idUser:number;
  public idU:number;
  public showMsg = false;
  public msg = '';
  public email:string;
  public password:string;

  public idEmail:string;

  constructor(public usuarioService:UsuarioService,
              public authService:AuthService,
              public router:Router) { }

  ngOnInit(): void {
    
  }

  public login():void{
    this.authService.loginWithEmilPassword(this.email, this.password).then(
      (value)=>{console.log(value);
        this.usuarioService.findByEmail(this.email).subscribe((usuario)=>{
          this.idUser =  usuario.idTipoUsuario;
          this.idU = usuario.idUsuario;
          this.idEmail = usuario.correoElectronico;
          localStorage.setItem('idUsuario', this.idU.toString());
          localStorage.setItem('email', this.idEmail);
          console.log(this.idU);
          this.routing();
        },error => {
          this.msg = error.error;
          this.showMsg = true;
        });
      },error => {
        this.msg = error.error;
        this.showMsg = true;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Credenciales incorrectas',
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
    }
  }

}
