import { Component, OnInit } from '@angular/core';
import { ContratsService } from '../core/services/contrats.service';
import { Router } from '@angular/router';
import { Contrat } from '../core/model/contrat';
import { Etudiant } from '../core/model/etudiant';
@Component({
  selector: 'app-main-contrat',
  templateUrl: './main-contrat.component.html',
  styleUrls: ['./main-contrat.component.css']
})
export class MainContratComponent implements OnInit {

  constructor(private contratsService: ContratsService,
    private route: Router) { }

  ngOnInit(): void {
  }
  
  save_modify_contrat(action:string,contrat:Contrat){
    if (action=="save"){
      this.contratsService.saveContrat(contrat,contrat.etudiant.idEtudiant).subscribe(
      ()=> this.route.navigate(['contrat']),
      ()=>{console.log('error'),
      ()=>{console.log('complete') }}
    )
 }else{
  this.contratsService.updateContrat(contrat).subscribe(
  ()=> this.route.navigate(['contrat']),
  ()=>{console.log('error'),
  ()=>{console.log('complete') }}
  )}
  }

  
  add_etudiant(etudiants:Etudiant[]) {
    let etudiant_id:number[]
    // let specialite_nom : string[]
    etudiants.forEach(cnt=>{
      etudiant_id.push(cnt["idEtudiant"])
    })
    return etudiant_id
};
}
