import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Reporte } from '../domain/Reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/reporte';
  }

  public findById(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findById/'+id);
  }

  public findByIdInmueble(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findByIdInmueble/'+id);
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
  }

  public save(reporte: Reporte): Observable<any>{
    return this.httpClient.post(this.url + '/save', reporte);
  }

  public update(reporte: Reporte): Observable<any>{
    return this.httpClient.put(this.url + '/update', reporte);
  }
  
  public delete(id:number): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }
}
