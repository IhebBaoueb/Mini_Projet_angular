import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement} from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  httpOption = {
    Headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http : HttpClient) { }
  url: string = 'http://localhost:8088/SpringMVC/servlet';


  getAllDepartement() {
    return this.http.get<Departement[]>(this.url + `/getDepartements`);

  }

  addDepartement(departement:Departement): Observable<Object> {
    return this.http.post(this.url + `/addDepartement`, departement);

  }
 
  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.url + `/updateDepartement`, departement);

  }

  deleteDepartement(idDepart: number): Observable<Object> {
    return this.http.delete(this.url + `/deleteDepartement/${idDepart}`);

  }

  getDepartementById(idDepart: number): Observable<Departement> {
    return this.http.get<Departement>(this.url + `/getDepartementById/${idDepart}`);
  } 

  







}
