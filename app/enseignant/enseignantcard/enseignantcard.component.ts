import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enseignant } from '../core/model/enseignant';
import { EnseignantService } from '../core/services/enseignant.service';
@Component({
  selector: 'app-enseignantcard',
  templateUrl: './enseignantcard.component.html',
  styleUrls: ['./enseignantcard.component.css']
})
export class EnseignantcardComponent implements OnInit {
  public list : Enseignant[];
  @Input() enseignant: Enseignant;
  @Input() nomInput : string;
  @Output() notification = new EventEmitter<Enseignant>();
  //@Output() notifiaction2 = new EventEmitter<Enseignant>();
  constructor(private enseignantService: EnseignantService) { }

  ngOnInit(): void {
  }
  sendNotif(){
    this.notification.emit(this.enseignant);
  }
  // sendNotif2(){
  //   this.notifiaction2.emit(this.enseignant);
  // }
}
