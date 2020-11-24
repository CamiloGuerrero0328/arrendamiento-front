import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EPaycoService {

  url: string;
  
  constructor(private httpClient: HttpClient) { 
    this.url = 'https://secure.epayco.co/validation/v1/reference/';
  }

  public getResponse(refEpayco: string): Observable<any>{
    return this.httpClient.get(this.url + refEpayco);

  }
}
