import { Component, OnInit } from '@angular/core';
import { ContratsService } from '../core/services/contrats.service';
import { Contrat, Specialite } from '../core/model/contrat';
import { Etudiant, Option } from '../core/model/etudiant';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { UpdateComponent } from '../update/update.component';
import { MainContratComponent } from '../main-contrat/main-contrat.component';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.css']
})
export class FormContratComponent implements OnInit {
  public contrats: Contrat[];
  public etudiant_id: number[];
  public specialite_nom: string[];
  public selected_etudiant:Etudiant;
  public date: Date;
  public contrat:Contrat;
  public etudiants:Etudiant[];
  public etudiants_filtred:Etudiant[];
  constructor(private contratsService: ContratsService,private add:MainContratComponent) { }

  ngOnInit(): void {
    this.contrat = new Contrat
    this.contrat.etudiant = new Etudiant
    this.etudiants_filtred=[]
    this.contratsService.getAllEtudiant().subscribe(
      (data:Etudiant[])=>{
        this.etudiants=data;
        this.etudiants_filtred = [...this.etudiants]
        this.add_etudiant()
      }
    )
      
    this.date = new Date;
  }
  add_etudiant() {
    this.etudiant_id = []
    this.specialite_nom = []
    this.etudiants.forEach(cnt=>{
      this.etudiant_id.push(cnt["idEtudiant"])
    })
    this.specialite_nom = Object.keys(Specialite)
};

update_available(){
  if(this.contrat.etudiant.idEtudiant){
  this.etudiants_filtred = this.etudiants.filter((etd)=>
  (etd.idEtudiant==this.contrat.etudiant.idEtudiant)
  )
  }else{
    this.etudiants_filtred = [...this.etudiants]
  }
}

  save_modify_contrat(){
    this.add.save_modify_contrat("save",this.contrat)
  }
}
