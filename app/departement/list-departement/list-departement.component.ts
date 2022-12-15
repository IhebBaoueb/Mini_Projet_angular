import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement} from '../core/models/departement';
import { ServicesService } from '../core/services/services.service';
import { FormBuilder,NgForm } from '@angular/forms';
import { data } from 'jquery';


@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    private departementService : ServicesService,
    private router: Router,
    private currentRoute: ActivatedRoute
    )  { }
  
    action: string;
    cloneListDepartement: Departement[];
    departement: Departement;
    listDepartement: Departement[];
  ngOnInit(): void {
    console.log("OnInit ...");   
    this.departement = new Departement();
    this.departementService.getAllDepartement().subscribe(
      (data)=> {
      this.listDepartement= data,
      this.cloneListDepartement=[...this.listDepartement];
    }
  
    )
  }

  //Delete departement
  delete(idDepart: number) {
    this.departementService.deleteDepartement(idDepart).subscribe((data) => {
      console.log(data);
      this.departementService.getAllDepartement();
      location.reload();
    });
  }
  //getById
  search(){
    this.departementService.getDepartementById(this.departement.idDepart).subscribe((data));
  }


  /* update departement
  update(departement : Departement) {
      this.departementService.updateDepartement(this.departement).subscribe(() => console.log('complete'));
   
    } */
    //update
  updateUniversite(idDepart: number) {
      this.router.navigate(['update/:idDepart',idDepart]);
    }
  
    searchById(){
      if(this.departement.idDepart){
        this.cloneListDepartement = this.listDepartement.filter(dep => dep.idDepart==this.departement.idDepart);
    
      }else{
        this.cloneListDepartement=[...this.listDepartement];
      }
    }
  }
