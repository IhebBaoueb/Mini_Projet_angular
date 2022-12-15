import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEtudiantComponent} from './list-etudiant/list-etudiant.component';
import {FormEtudiantComponent} from './form-etudiant/form-etudiant.component';
import {MainEtudiantComponent} from './etudiant/main-etudiant/main-etudiant.component';

export const routes: Routes = [
      {path: '', component: MainEtudiantComponent, children: [
                  {path: '' , component : ListEtudiantComponent},
                  {path: 'form-etudiant' , component : FormEtudiantComponent},
                  {path: 'update/:idEtudiant' , component : FormEtudiantComponent}
            ]},

];


