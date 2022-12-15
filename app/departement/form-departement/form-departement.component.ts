import { Component, OnInit } from '@angular/core';
import { FormBuilder,NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Departement } from 'src/app/core/models/departement';
// import { ServicesService } from 'src/app/core/services.service';
import { Departement} from '../core/models/departement';
import { ServicesService } from '../core/services/services.service';
@Component({
  selector: 'app-form-departement',
  templateUrl: './form-departement.component.html',
  styleUrls: ['./form-departement.component.css']
})
export class FormDepartementComponent implements OnInit {
  

  constructor(
    private departementService: ServicesService,
    private route: Router,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) { }

  departement: Departement;
  action: string;
  listDepartement: Departement[];
  universites=['ESPRIT','INSAT','INIT','SUPCOM'];


  ngOnInit(): void {
    this.departement= new Departement();
    this.listDepartement=[];

    let idDepart= this.currentRoute.snapshot.params['idDepart'];
    if (idDepart!= null) {
      //update departement
      this.action = 'update';
      this.departementService.getDepartementById(idDepart).subscribe((data: Departement) => {
        this.departement = data;
      });
      console.log('=================>' + this.departement);
    } else {
      //add 
      this.action = 'add';
      this.departement = new Departement();
    }

    //get
    this.departementService.getAllDepartement().subscribe((data: Departement[]) => {
      this.listDepartement = data;
    });
  }
    


    //add|update
    add() {
      if (this.action == 'update') {
        this.departementService
          .updateDepartement(this.departement)
          .subscribe(() =>{ console.log('complete')   
          this.departementService.getAllDepartement().subscribe((data: Departement[]) => {
            this.listDepartement = data;
          });
        }
          
          );
      } else {
        console.log('this.departement:', this.departement);
        this.departementService.addDepartement(this.departement).subscribe((result) => {
          if (result) {
            this.listDepartement = [this.departement, ...this.listDepartement];
            location.reload();
          }
        });
      }
    }
  
    //delete
    delete() {
      this.departementService.deleteDepartement(this.departement.idDepart);
    }
    //navigate
    goToDepartementList() {
      this.route.navigate(['/departement/list-departement']);
    }

    
  }


 
