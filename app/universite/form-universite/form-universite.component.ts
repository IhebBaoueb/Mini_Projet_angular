import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from '../core/universite';
import { UniversiteService } from '../core/universite.service';


@Component({
  selector: 'app-form-universite',
  templateUrl: './form-universite.component.html',
 
})
export class FormUniversiteComponent implements OnInit {

  constructor(
    private universiteService:UniversiteService,
    private router: Router,
    private currentRoute: ActivatedRoute,
 
    ) {}
    universite:Universite;
    action: string;
    listUniversite:Universite[];

  ngOnInit(): void {
    this.universite = new Universite();
    let idUniv = this.currentRoute.snapshot.params['idUniv'];
    if(idUniv != null){
      //update
      this.action='update';
      this.universiteService.getUniversiteById(idUniv).subscribe((data:Universite)=>{
        this.universite = data;
      });
      console.log('=================>' + this.universite);
      this.goToDepartmentList

    }else{
      this.action='add';
      this.universite = new Universite();
      this.goToDepartmentList
    }
     //get
     this.universiteService.getUniversite().subscribe((data: Universite[]) => {
      this.listUniversite = data;
    });
  }
    //add|update
    add() {
    if (this.action == 'update') {
    
      this.universiteService
      
        .updateUniversite(this.universite)
        .subscribe(() => console.log('complete'));
       this.goToDepartmentList(); 
        //this.toastr.success("success");
    } else {
      
      console.log('this.universite:', this.universite);
     // this.toastr.success("success");
      this.universiteService.addUniversite(this.universite).subscribe((result) => {
       
        if (result) {
          //this.toastr.success("success");
         
          this.listUniversite = [this.universite, ...this.listUniversite];
        
          this.goToDepartmentList(); 
        }
      });
    }

  }
  
   //navigate
   goToDepartmentList() {
    this.router.navigate(['/universite/list-universite']);
  }

}
