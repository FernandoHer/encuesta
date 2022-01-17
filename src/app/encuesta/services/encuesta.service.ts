import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {


  private baseURL:string = environment.baseUrl;

  constructor( private http:HttpClient) { }


  getData(name:string): Observable<any>{
    console.log(name);
    return this.http.get(`${this.baseURL}/${name}`)
  }

 }
