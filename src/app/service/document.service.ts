import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Document } from '../domain/Document';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/documentos';
  }

  public findById(id:string): Observable<any>{
    return this.httpClient.get(this.url+'findById/'+id);
  }

  public findByIdCliente(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findByIdCliente/'+id);
  }
  
  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + '/findAll');
  }
  
  public save(document: Document): Observable<any>{
    return this.httpClient.post(this.url + '/save', document);
  }
  
  public update(document: Document): Observable<any>{
    return this.httpClient.put(this.url + '/update', document);
  }
  
  public delete(id:string): Observable<any>{
    return this.httpClient.delete(this.url+'/delete'+id);
  }
}
