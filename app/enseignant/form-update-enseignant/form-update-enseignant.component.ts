import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnseignantService } from '../core/services/enseignant.service';
import { Enseignant } from '../core/model/enseignant';

@Component({
  selector: 'app-form-update-enseignant',
  templateUrl: './form-update-enseignant.component.html',
  styleUrls: ['./form-update-enseignant.component.css']
})
export class FormUpdateEnseignantComponent implements OnInit {
  updateForm: FormGroup;
  public enseignant: Enseignant;
  constructor(private route: Router, private currentRoute: ActivatedRoute, private enseignantService: EnseignantService) { }

  ngOnInit(): void {
    this.enseignant=new Enseignant();
    this.updateForm = new FormGroup ({
      nom: new FormControl( '', [Validators.required , Validators.minLength(4), Validators.pattern("[A-Za-z]*")]),
      prenom: new FormControl( '', [Validators.required, Validators.pattern("[A-Za-z]*")]),
      salaires: new FormControl('', [Validators.required, Validators.min(0)]),
      grades: new FormControl('', Validators.required),
      matieres: new FormControl('', Validators.required)
    });
    let id = this.currentRoute.snapshot.params['id'];
     if(id!=null){
       //update
       this.enseignantService.getEnseignantById(id).subscribe(
         (data: Enseignant)=>{this.enseignant=data}
       )
      //  console.log(this.updateForm.value , 'hey');
     }
  }
  onUpdate(){
      this.enseignantService.updateEnseignant(this.enseignant).subscribe(
        () => this.route.navigate(['/enseignant']),
        () => {
          console.log('error'),
          () =>{
            console.log('complete')
          }
        }
      )
      alert ('SUCCESS\n\n' + JSON.stringify(this.updateForm.value, null, 4));

  }
  reset(){
    this.updateForm.reset();
  }
}
