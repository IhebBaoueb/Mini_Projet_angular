import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { routes } from './etudiant-routing.module';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { FormEtudiantComponent } from './form-etudiant/form-etudiant.component';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import {Forms} from '../forms/forms.module';
import { MainEtudiantComponent } from './etudiant/main-etudiant/main-etudiant.component';





@NgModule({
  declarations: [
    ListEtudiantComponent,
    FormEtudiantComponent,
    MainEtudiantComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
      ReactiveFormsModule,
      NouisliderModule,
      TagInputModule,
      MaterialModule,
  ]
})
export class EtudiantModule { }
