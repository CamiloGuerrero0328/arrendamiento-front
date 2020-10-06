import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Inmueble } from '../domain/Inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/inmueble';
  }

  public findById(id:string): Observable<any>{
    return this.httpClient.get(this.url+'/findById/'+id);
  }

  public findByIdCliente(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findByIdCliente/'+id);
  }
  
  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
    }
  
  public save(inmueble: Inmueble): Observable<any>{
    return this.httpClient.post(this.url + '/save', inmueble);
  }
  
  public update(inmueble: Inmueble): Observable<any>{
    return this.httpClient.put(this.url + '/update', inmueble);
  }
  
  public delete(id:string): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }
}
