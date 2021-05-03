import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Abogado } from '../domain/Abogado';

@Injectable({
  providedIn: 'root'
})
export class AbogadoService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/abogado';
  }

  public findById(id:string): Observable<any>{
    return this.httpClient.get(this.url+'/findById/'+id);
  }

  public findAbogadoByIdUser(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findAbogadoByIdUser/'+id);
  }
  
  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
    }
  
  public save(abogado: Abogado): Observable<any>{
    return this.httpClient.post(this.url + '/save', abogado);
  }
  
  public update(abogado: Abogado): Observable<any>{
    return this.httpClient.put(this.url + '/update', abogado);
  }
  
  public delete(id:string): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }
}
