import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutes, DepartementRoutingModule } from './departement-routing.module';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { FormDepartementComponent } from './form-departement/form-departement.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Forms } from '../forms/forms.module';
import { MaterialModule } from '../app.module';
import { TagInputModule } from 'ngx-chips';
import { NouisliderModule } from 'ng2-nouislider';


@NgModule({
  declarations: [
    ListDepartementComponent,
    FormDepartementComponent
  ],
  imports: [
    CommonModule,
    DepartementRoutingModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(DepartementRoutes),
    Forms,
    MaterialModule,
    TagInputModule,
    NouisliderModule,

  ]
})
export class DepartementModule { }
