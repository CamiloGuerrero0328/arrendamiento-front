import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proceso } from 'src/app/domain/Proceso';
import { Transaction } from 'src/app/domain/Transaction';
import { EPaycoService } from 'src/app/service/e-payco.service';
import { ProcesoService } from 'src/app/service/proceso.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-response-mes',
  templateUrl: './response-mes.component.html',
  styleUrls: ['./response-mes.component.css']
})
export class ResponseMesComponent implements OnInit {

  public idInmueble:number;
  public idCliente:number;
  public idTransaction:number;

  public showMsg: boolean = false;
  public msg: string;

  public transaction:Transaction;
  public refePayco:string;
  public response:any = null;

  public fecha: Date = new Date();

  constructor(public paycoService:EPaycoService,
    private activatedRoute: ActivatedRoute,
    public transactionService: TransactionService) { }

  ngOnInit(): void {
    this.refePayco = this.activatedRoute.snapshot.queryParamMap.get('ref_payco');
    this.idInmueble = Number(localStorage.getItem('idInmu'));
    this.idCliente = Number(localStorage.getItem('idClie'));
    this.idTransaction = Math.floor(Math.random() * 200);
    this.getResponse();
  }

  public getResponse():void{
    this.paycoService.getResponse(this.refePayco).subscribe(
      (data)=>{
        this.response = data;
        this.transaction = new Transaction(data.data.x_description, this.fecha, this.idTransaction, data.data.x_amount, this.idCliente, this.idInmueble, data.data.x_transaction_id);
        this.transactionService.save(this.transaction).subscribe(
          (data) => {
            console.log(data);
          }, error => {
            this.showMsg = true;
            this.msg = error.error.message;
            console.log("Error");
          }, () => {
            console.log("Complete");
          }
        );
        console.log(data);
      },error=>{
        console.log(error);
      })
  }

}
