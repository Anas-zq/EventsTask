import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Inject } from "@angular/core";
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {

  editEventId: any;
  eventForm: FormGroup;
  editMode: boolean = false;
  cards : any[] = [];
  idEdit : any;
  constructor(
    private activateroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.eventForm = this.fb.group({
      name: ['', []],
      description: ['', []],
      dateEvent: ['', []],
    });
  }

  ngOnInit(): void {
    this.editEventId = this.activateroute.snapshot.paramMap.get("id");
    if(this.editEventId !== "0")
      this.editMode =true
    this.CreateForm();
    this.resetForm();
    if (this.editMode) {
      this.firestore.collection('Events').snapshotChanges().subscribe(data => {
        this.cards = data.map(e => {
          return {
            id: e.payload.doc.id,
            name : e.payload.doc.get("name"),
            color : e.payload.doc.get("color"),
            description : e.payload.doc.get("description"),
            dateEvent : e.payload.doc.get("dateEvent")
          } 
        });
        var card = this.cards.filter(e=> e.id == this.editEventId)[0];
        this.idEdit = card.id; 
        this.eventForm.patchValue({
          name: card.name,
          description:card.description,
          dateEvent:card.dateEvent
        })
      });

    
    }

  }
  CreateForm() {
    this.eventForm = this.fb.group({
      name: ['', []],
      description: ['', []],
      dateEvent: ['', []],
    });
  }
  resetForm() {
    this.eventForm.reset();
  }

  submitForm(form: any): void {
    for (const i in this.eventForm.controls) {
      this.eventForm.controls[i].markAsDirty();
      this.eventForm.controls[i].updateValueAndValidity();
    }
    var color;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayS = yyyy + '-' + mm + '-' +dd ;
    if (form.dateEvent > todayS)
      color = "green";
    if (form.dateEvent === todayS)
      color = "blue";
    if (form.dateEvent < todayS)
      color = "red";
    const event = {
      id: this.editMode ? this.idEdit  : 0,
      name: form.name,
      color: color,
      description: form.description,
      dateEvent: form.dateEvent
    }
    if(this.editMode)
      this.updateEvent(event);
    else
      this.createEvent(event);
    this.router.navigate(['eventPage']);

  }
  cancel() {
    this.router.navigate(['eventPage']);
  }
  createEvent(event: any) {
    return this.firestore.collection('Events').add(event);
  }
  updateEvent(event: any){
    this.firestore.doc('Events/' + event.id).update(event);
  }
}
