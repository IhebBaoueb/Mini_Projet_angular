import { Universite } from '../core/universite';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http : HttpClient) { }
  url: string = 'http://localhost:8088/SpringMVC/servlet';


  getUniversite() {
    return this.http.get<Universite[]>(this.url + `/getUniversites`);
  }

  addUniversite(universite: Universite): Observable<Object> {
    return this.http.post(this.url + `/addUniversite`, universite);
  }

  updateUniversite(universite: Universite){
    return this.http.put(this.url + `/updateUniversite`, universite);
  }
 
  deleteUniversite(idUniversite: number): Observable<Object> {
    return this.http.delete(this.url + `/deleteUniversite/${idUniversite}`);
  }

  getUniversiteById(idUniversite: number): Observable<Universite> {
    return this.http.get<Universite>(this.url + `/getUniversiteById/${idUniversite}`);
  } 

  findUniversiteByRegion(region: string): Observable<Universite> {
    return this.http.get<Universite>(this.url + `/findUniversiteByRegion/${region}`);
  } 
  assignUniversiteToDepartement(idUniversite: number,idDepartement: number): Observable<Universite[]>{
    return this.http.put<Universite[]>(this.url +`/asseignUniversiteToDepartement/${idUniversite}/${idDepartement}`,null)
  }

 
  
}
