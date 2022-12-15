import { Component, OnInit } from '@angular/core';
import { Enseignant } from '../core/model/enseignant';
import { EnseignantService } from '../core/services/enseignant.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-enseignant',
  templateUrl: './form-enseignant.component.html',
  styleUrls: ['./form-enseignant.component.css']
})
export class FormEnseignantComponent implements OnInit {
  public enseignant: Enseignant;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  // enseignantImage: any = File;
  // imagePreview: string;


  constructor(private enseignantService: EnseignantService,
    private route: Router) {}

  ngOnInit(): void {
    this.enseignant=new Enseignant();
    this.fileInfos = this.enseignantService.getFiles();
  }

  
  saveEnseignant(){
    this.enseignantService.addEnseignant(this.enseignant).subscribe(
          () => {
            console.log('complete' + this.enseignant.nomEnseignant);
            this.upload();
          }
         // () => this.route.navigate(['/enseignant'])
    )
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.enseignantService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.enseignantService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
  // onImagePick(event) {
  //   const file = event.target.files[0];
  //   this.enseignantImage = file;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if ( this.enseignantImage != null) {
  //       this.imagePreview = reader.result as string;
  //     } else {
  //       this.imagePreview = null;
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // }
 }
