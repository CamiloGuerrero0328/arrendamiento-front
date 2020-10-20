import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proceso } from '../domain/Proceso';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/proceso';
  }

  public findById(id:number): Observable<any>{
    return this.httpClient.get(this.url+'findById/'+id);
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
  }

  public save(proceso: Proceso): Observable<any>{
    return this.httpClient.post(this.url + '/save', proceso);
  }

  public update(proceso: Proceso): Observable<any>{
    return this.httpClient.put(this.url + '/update', proceso);
  }
  
  public delete(id:number): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }

}
