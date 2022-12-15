import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:8088/SpringMVC/servlet';
  getAllEtudiant() {
    return this.http.get(this.url + '/getEtudiants');
  }
  addEtudiant(e: Etudiant): Observable<Object> {
    return this.http.post(this.url + '/addEtudiant', e);
  }
  updateEtudiant(e: Etudiant): Observable<Object> {
    return this.http.put<Etudiant>( this.url + '/updateEtudiant', e);
  }
  getEtudiantById(idEtudiant: number) {
    return this.http.get<Etudiant>(this.url + '/getEtudiantById/'+idEtudiant);
  }
  deleteEtudiant(idEtudiant: number) {
    return this.http.delete(this.url + '/deleteEtudiant/'+idEtudiant);
  }
}
