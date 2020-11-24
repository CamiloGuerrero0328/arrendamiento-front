import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proceso } from 'src/app/domain/Proceso';
import { EPaycoService } from 'src/app/service/e-payco.service';
import { ProcesoService } from 'src/app/service/proceso.service';

@Component({
  selector: 'app-response-payco',
  templateUrl: './response-payco.component.html',
  styleUrls: ['./response-payco.component.css']
})
export class ResponsePaycoComponent implements OnInit {

  public proceso:Proceso;

  public refePayco:string;
  public response:any = null;
  public idProceso:number;

  constructor(public paycoService:EPaycoService,
              private activatedRoute: ActivatedRoute,
              public procesoService:ProcesoService) { }

  ngOnInit(): void {
    this.refePayco = this.activatedRoute.snapshot.queryParamMap.get('ref_payco');
    this.idProceso = +localStorage.getItem('proceso');
    this.findByIdProceso();
  }

  public findByIdProceso():void{
    this.procesoService.findById(this.idProceso).subscribe(
      (data)=>{
        this.proceso = data;
        this.getResponse();
    },error=>{
      console.log(error);
    })
  }

  public getResponse():void{
    this.paycoService.getResponse(this.refePayco).subscribe(
      (data)=>{
        this.response = data;
        console.log(data);
        if(data.data.x_cod_transaction_state == 1){
          //Aqui voy actualizar el estado del proceso a pagado
          this.proceso.pagado=true;
          this.procesoService.update(this.proceso).subscribe(
            ()=>{
              
          },error=>{

          },()=>{
            
          });
        }
      },error=>{
        console.log(error);
      })
  }

}
