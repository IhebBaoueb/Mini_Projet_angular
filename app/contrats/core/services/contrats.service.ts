import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contrat } from '../model/contrat';
import { Etudiant } from '../model/etudiant';


@Injectable({
  providedIn: 'root'
})
export class ContratsService {
  
  public uri= environment.uri +'getContrats'
  public url_etudiant = environment.uri +'getEtudiants'
  constructor(private http: HttpClient) { }
  getAllContrats(){
     return this.http.get<Contrat[]>(this.uri)
  }

  getAllEtudiant(){
    return this.http.get<Etudiant[]>(this.url_etudiant)
  }
  saveContrat(contrat: Contrat,id_etudiant:number){
    return this.http.post(environment.uri+'affectContratToEtudiantById/'+id_etudiant,contrat)
  }
  updateContrat(contrat: Contrat){
    return this.http.put(environment.uri+'updateContrat/',contrat)
  }
  deleteContrat(id:number){
    return this.http.delete(environment.uri+'deleteContrat/'+id)
  }
  getContratById(id:number){
    return this.http.get(environment.uri+'getContratById/'+id)
  }
}
