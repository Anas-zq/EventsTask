import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../card';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  cards : any[] = [];
  constructor(
    private router: Router,
    private firestore: AngularFirestore
  ) {
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
    });


   }
  
  ngOnInit(): void {
     
  }
  addCard(){
    this.router.navigate(['addEditEvent/0']);
  }
  editCard(card : any){
    this.router.navigate(['addEditEvent/' + card.id]);
  }
  deleteCard(card:any){
    this.firestore.doc('Events/' + card.id).delete();
  }
 

}
