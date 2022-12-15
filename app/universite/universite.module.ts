import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniversiteRoutes } from './universite.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { FormUniversiteComponent } from './form-universite/form-universite.component';
import { ListUniversiteComponent } from './list-universite/list-universite.component';
import { UpdateUniversiteComponent } from './update-universite/update-universite.component';



@NgModule({
  declarations: [
    FormUniversiteComponent,
    ListUniversiteComponent,
    UpdateUniversiteComponent
  ],
  imports: [
    RouterModule.forChild(UniversiteRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class UniversiteModule { }
