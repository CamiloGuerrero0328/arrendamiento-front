import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../domain/Usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + '/api/usuario';
  }

  public findById(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findById/'+id);
  }

  public findByEmail(id:string): Observable<any>{
    return this.httpClient.get(this.url+'/findByEmail/'+id);
  }

  public findByTipoUsuario(id:number): Observable<any>{
    return this.httpClient.get(this.url+'/findByTipoUsuario/'+id);
  }
  
    public findAll(): Observable<any>{
      return this.httpClient.get(this.url + '/findAll');
    }
  
    public save(usuario: Usuario): Observable<any>{
      return this.httpClient.post(this.url + '/save', usuario);
    }
  
    public update(usuario: Usuario): Observable<any>{
      return this.httpClient.put(this.url + '/update', usuario);
    }
  
    public delete(id:number): Observable<any>{
      return this.httpClient.delete(this.url+'/delete/'+id);
    }
}
