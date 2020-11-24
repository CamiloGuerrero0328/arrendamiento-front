import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbogadoService } from 'src/app/service/abogado.service';
import { AuthService } from 'src/app/service/auth.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-abogado',
  templateUrl: './abogado.component.html',
  styleUrls: ['./abogado.component.css']
})
export class AbogadoComponent implements OnInit {

  public idUser: string;
  public mostrarRegistro:boolean = false;

  constructor(public router: Router, public autService:AuthService, public abogadoService: AbogadoService) { }

  ngOnInit(): void {
    this.idUser = String(localStorage.getItem('idUsuario'));
    this.validateRegister();
  }

  public validateRegister(): void{
    this.abogadoService.findById(this.idUser).subscribe(
      (abogado)=>{
        console.log(abogado);
        if(abogado === null){
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
