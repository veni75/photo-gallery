import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  all: Observable<User[]>;
  itemsCollection: AngularFirestoreCollection<any>;
  //userUrl: string = 'http://localhost:3000/user';
  //list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    //private http: HttpClient,
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

  /* getAll(): void {
    this.http.get<User[]>(this.userUrl).subscribe(
      data => this.list$.next(data) 
       
    )
  } */

  /* 
  get(id: number | string): Observable<User> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<User>(`${this.userUrl}/${id}`);
    }
    return of(new User())
  }
  create(user: User): void {
    this.http.post<User>(
      `${this.userUrl}`, user).subscribe(
        () => this.getAll()
      );
  }
  update(user: User): void {
    this.http.patch<User>(
      `${this.userUrl}/${user.id}`, user).subscribe(
        () => this.getAll()
      );
  }
  updateLike(user: User): void {
    this.http.patch<User>(
      `${this.userUrl}/${user.id}`, user.liked).subscribe(
        () => this.getAll()
      );
  }
  remove(user: User): void {
    this.http.delete<User>(
      `${this.userUrl}/${user.id}`).subscribe(
        () => this.getAll()
      );
  } */

  /* Observabléval
  getAll():Observable<User[]>{    
    return this.http.get<User[]>(this.userUrl);
  }
  get(user:User):Observable<User>{    
    return this.http.get<User>(`${this.userUrl}/${user.id}`);
  }
  create(user:User):Observable<User>{      
    return this.http.post<User>(this.userUrl,user);
  } 
  remove(user:User):Observable<User>{    
    return this.http.delete<User>(`${this.userUrl}/${user.id}`);
  }
  update(user:User):Observable<User>{     
    return this.http.patch<User>(`${this.userUrl}/${user.id}`,user);
  } */
}
