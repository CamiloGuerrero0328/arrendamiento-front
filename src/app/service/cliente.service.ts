import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../domain/Cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/cliente';
  }

  public findById(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findById/'+id);
  }

  public findByTipoCliente(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findByTipoCliente/'+id);
  }

  public findClientByIdUser(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findClientByIdUser/'+id);
  }
  
  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
  }
  
  public save(cliente: Cliente): Observable<any>{
    return this.httpClient.post(this.url + '/save', cliente);
  }
  
  public update(cliente: Cliente): Observable<any>{
    return this.httpClient.put(this.url + '/update', cliente);
  }
  
  public delete(id:string): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }
}
