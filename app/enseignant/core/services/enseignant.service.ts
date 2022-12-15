import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Enseignant} from '../model/enseignant';
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  public listEnseignantShare: Enseignant[];
  url: string = 'http://localhost:8088/SpringMVC/servlet';
  private baseUrl = 'http://localhost:8088/SpringMVC/servlet';
  constructor(private http: HttpClient) { }
  getEnseignants(){
    return this.http.get<Enseignant[]>(this.url + '/getAllEnseignants');
  }
  addEnseignant(enseignant: Enseignant){
    return this.http.post(this.url + '/addEnseignant' , enseignant);
  }
  deleteEnseignant(id:number){
    return this.http.delete(this.url + '/deleteEnseignant/' + id);
  }
  updateEnseignant(enseignant: Enseignant){
    return this.http.put(this.url + '/updateEnseignant' , enseignant);
  }
  getEnseignantById(id:number){
    return this.http.get(this.url + '/getEnseignantById/' + id);
  }
  findEquipeNomEquipeByEnseignantIdEnseignant(id:number){
    return this.http.get(this.url + '/findEquipeNomEquipeByEnseignantIdEnseignant/' + id);
  }
  findListEtudiantsByEquipeAndEnseignant(id:number, nom: String){
    return this.http.get(this.url + '/findListEtudiantsByEquipeAndEnseignant/' + id + '/' + nom);
  }
  findListEtudiantsByEquipeAndEnseignant2(id:number, nom: String){
    return this.http.get(this.url + '/findListEtudiantsByEquipeAndEnseignant2/' + id + '/' + nom);
  }
  findListEquipe(){
    return this.http.get(this.url+ '/findListEquipe');
  }
  findAutresEquipes(id:number){
    return this.http.get(this.url+ '/findAutresEquipes/' + id);
  }
  affecterEnseignantToEquipe(id:number, nom: String, enseignant: Enseignant){
    return this.http.put(this.url + '/affecterEnseignantToEquipe/' + id + '/' + nom ,enseignant);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getNbrEnseignantParGrade(grade : String){
    return this.http.get(this.url + '/getNbrEnseignantParGrade/' + grade);
  }
  getListStat(){
    return this.http.get(this.url + '/getListStat' );
  }
}
    
