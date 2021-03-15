import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  all: Observable<Location[]>;
  itemsCollection: AngularFirestoreCollection<any>;


  constructor(
    private firestore: AngularFirestore,
  ) {
    this.itemsCollection = this.firestore.collection('user');
    this.all = this.itemsCollection.valueChanges({
      idField: 'docID'
    });
  }

  create(doc: any): Promise<any> {
    return this.itemsCollection.add({ ...doc });
  }

  update(doc: any): Promise<any> {
    const id = doc.docID;
    delete doc.docID;
    return this.itemsCollection.doc(id).update({ ...doc });
  }

  remove(doc: any): Promise<any> {
    return this.itemsCollection.doc(doc.docID).delete();
  }
}
