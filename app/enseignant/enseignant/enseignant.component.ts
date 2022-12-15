import { Component, OnInit } from '@angular/core';
import {Enseignant} from "../core/model/enseignant";
import { EnseignantService } from '../core/services/enseignant.service';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {
  public listEnseignant: Enseignant[];
  nom: string ='';
  p: number = 1;
  constructor(private serviceEnseignant: EnseignantService) { }

  ngOnInit(): void {
    this.serviceEnseignant.getEnseignants().subscribe(
        (data: Enseignant[]) => this.listEnseignant = data
    );
  }
  deleteEnseignant(enseignant : Enseignant) {
    let i = this.listEnseignant.indexOf(enseignant);
    if (confirm('Are you sure to delete'))
    this.serviceEnseignant.deleteEnseignant(enseignant.idEnseignant).subscribe(
      ()=>{
        this.listEnseignant.splice(i,1)
        alert('suppression effectuée avec succès');
      } 
    );
  }
}
