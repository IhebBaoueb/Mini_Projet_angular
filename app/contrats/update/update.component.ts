import { Component, OnInit} from '@angular/core';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Contrat, Specialite } from '../core/model/contrat';
import { Etudiant } from '../core/model/etudiant';
import { ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContratsService } from '../core/services/contrats.service';
import { Router } from '@angular/router';
import { MainContratComponent } from '../main-contrat/main-contrat.component';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public update_group:FormGroup;
  public contrats: Contrat[];
  public etudiant_id: number[];
  public specialite_nom: string[];
  public selected_etudiant:Etudiant;
  public date: Date;
  public contrat:Contrat;
  public etudiants:Etudiant[];
  public etudiants_filtred:Etudiant[];
  constructor(private contratsService: ContratsService,
    private route: Router,private fb: FormBuilder,private currentRoute:ActivatedRoute,private add:MainContratComponent) { }

  ngOnInit(): void {
    
    this.specialite_nom = Object.keys(Specialite)
    this.contrat = new Contrat()
    this.contrat.etudiant = new Etudiant()
    this.etudiants_filtred =[]
    
    this.update_group= this.fb.group(
      {
        id_etud:['',[Validators.required, Validators.nullValidator]],
        date_debut:['',[Validators.required, Validators.nullValidator]],
        date_fin:['',[Validators.required, Validators.nullValidator]],
        archive:['',[Validators.required, Validators.nullValidator]],
        specialite:['',[Validators.required, Validators.nullValidator]],
        description:['',[Validators.required, Validators.minLength(3)]]
       }
    ) 
    let id = this.currentRoute.snapshot.params['id'];
    this.contratsService.getAllEtudiant().subscribe(
      (data:Etudiant[])=>{
        this.etudiants=data;
        this.etudiants_filtred = [...this.etudiants]
        this.add_etudiant()
      
      }
    )

    if(id!=null){
      this.contratsService.getContratById(id).subscribe(
        (data:Contrat)=>{
          this.contrat =data
          this.selected_etudiant = this.contrat.etudiant
          this.update_group= this.fb.group(
            {
              id_etud:['',[Validators.required, Validators.nullValidator]],
              date_debut:['',[Validators.required, Validators.nullValidator]],
              date_fin:['',[Validators.required, Validators.nullValidator,this.dateRangeValidator(this.contrat.dateDebutContrat)]],
              archive:['',[Validators.required, Validators.nullValidator]],
              specialite:['',[Validators.required, Validators.nullValidator]],
              description:['',[Validators.required, Validators.minLength(3)]]
             }
          ) 
        }
      )
    }
  }
  
update_available(){
  if(this.contrat.etudiant.idEtudiant){
  this.etudiants_filtred = this.etudiants.filter((etd)=>
  (etd.idEtudiant==this.contrat.etudiant.idEtudiant)
  )
  }else{
    this.etudiants_filtred = [...this.etudiants]
  }
}

  dateRangeValidator(min: Date): ValidatorFn {
    return control => {
      if (!control.value) return null;
      
      if(min){
      const dateValue = new Date(control.value).toISOString().split('T')[0];
      if (min && dateValue < min.toString()) {
        return { message: 'Date fin doit etre sup a date debut' };
      }
      }
      null;
    }
  }

  save_modify_contrat(){
    this.add.save_modify_contrat("update",this.contrat)
  }
  
  add_etudiant() {
    this.etudiant_id = [...this.add.add_etudiant(this.etudiants)]
};
}
