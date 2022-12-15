import { Component, Input, OnInit } from '@angular/core';
import { EtudiantService } from '../core/services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Etudiant } from '../core/models/etudiant';

@Component({
  selector: 'app-form-etudiant',
  templateUrl: './form-etudiant.component.html',
})
export class FormEtudiantComponent implements OnInit {
 
  

  constructor(
      private etudiantService: EtudiantService,
      private route: Router,
      private currentRoute: ActivatedRoute,
      private formBuilder: FormBuilder
  ) { }
  etudiant: Etudiant;
  action: string;
  listEtudiant: Etudiant[];

  ngOnInit(): void {
    //update
    this.etudiant = new Etudiant();
    this.listEtudiant=[];
    let idEtudiant = this.currentRoute.snapshot.params['idEtudiant'];
    if (idEtudiant != null) {

      this.action = 'update';
      this.etudiantService.getEtudiantById(idEtudiant).subscribe((data: Etudiant) => {
        this.etudiant = data;
      });
    } else {
      this.action = 'add new';
      this.etudiant = new Etudiant();
    }
    this.etudiantService.getAllEtudiant().subscribe((data: Etudiant[])=> 
    {
      this.listEtudiant = data
    });
      
  }
    add() {
      if (this.action == 'update') {
        this.etudiantService.updateEtudiant(this.etudiant)
            .subscribe(() => console.log('complete'));
      } else {
        console.log('this.etudiant:', this.etudiant);
        this.etudiantService.addEtudiant(this.etudiant).subscribe((result) => {
          if (result) {
            this.route.navigate(['/etudiant/listEtudiant']);
            this.listEtudiant = [this.etudiant, ...this.listEtudiant];
            location.reload();
          }
        });
      }
    }


    delete() {
      this.etudiantService.deleteEtudiant(this.etudiant.idEtudiant);
    }
    goToEtudiantList() {
      this.route.navigate(['/etudiant/list-etudiant']);
    }
  }

