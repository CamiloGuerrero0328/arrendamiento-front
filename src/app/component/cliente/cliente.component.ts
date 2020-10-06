import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public router: Router, public autService:AuthService) { }

  ngOnInit(): void {
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
