import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from '../core/universite';
import { UniversiteService } from '../core/universite.service';

@Component({
  selector: 'app-update-universite',
  templateUrl: './update-universite.component.html',
 
})
export class UpdateUniversiteComponent implements OnInit {

  constructor(
    private universiteService:UniversiteService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private fb:FormBuilder
 
    ) {}
    updateUniversite:FormGroup;
    universite:Universite;
    action: string;
    listUniversite:Universite[];

  ngOnInit(): void {
    this.updateUniversite=this.fb.group({
      nomUniv:['', [Validators.required, Validators.nullValidator]],
    region:['', [Validators.required, Validators.nullValidator]],
    adresse:['', [Validators.required, Validators.nullValidator]],
    description:['', [Validators.required, Validators.nullValidator]],
    imgUrl:['', [Validators.required, Validators.nullValidator]]
    })
    
    this.universite = new Universite();
    let idUniv = this.currentRoute.snapshot.params['idUniv'];
    if(idUniv != null){
      //update
      this.action='update';
      this.universiteService.getUniversiteById(idUniv).subscribe((data:Universite)=>{
        this.universite = data;
      });
      console.log('=================>' + this.universite.adresse);
      this.goToDepartmentList

    }else{
      this.action='add';
      this.universite = new Universite();
      this.goToDepartmentList
    }
  }
  //add|update
  add() {
    if (this.action == 'update') {
    console.log(this.universite)
      this.universiteService
      
        .updateUniversite(this.universite)
        .subscribe(() =>{console.log('complete')
        this.goToDepartmentList()} 
        );
        //this.toastr.success("success");
    } else {
      
      console.log('this.universite:', this.universite);
     // this.toastr.success("success");
      this.universiteService.addUniversite(this.universite).subscribe((result) => {
       
        if (result) {
          //this.toastr.success("success");
         
          this.listUniversite = [this.universite, ...this.listUniversite];
        
          location.reload();
        }
      });
    }

  }
     //navigate
     goToDepartmentList() {
      this.router.navigate(['/universite/list-universite']);
    }

}
