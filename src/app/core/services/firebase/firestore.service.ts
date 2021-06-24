import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { CustomUser } from '../../../interfaces/customUser';
import { Race } from '../../../interfaces/race';
import { FirestoreReferencesEnum } from '../../../enums/firestoreReferences.enum';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor (private firestore: AngularFirestore) { }

  public getUsers (): Observable<any> {
    return this.firestore.collection(FirestoreReferencesEnum.usersCollectionReference).get();
  }

  public getUsersStream (): Observable<any> {
    return this.firestore.collection(FirestoreReferencesEnum.usersCollectionReference, ref => ref.orderBy('first', 'desc')).valueChanges();
  }

  public getUserById (id: string): Observable<DocumentSnapshot<CustomUser>> {
    return this.firestore.collection(FirestoreReferencesEnum.usersCollectionReference)
      .doc(id)
      .get() as Observable<DocumentSnapshot<CustomUser>>;
  }

  public saveRace (race: Race): Promise<any> {
    return this.firestore.collection(FirestoreReferencesEnum.raceCollectionReference).add(race);
  }

  public increaseUserStats (uid: string, position: string): Promise<void> {
    return this.firestore.collection(FirestoreReferencesEnum.usersCollectionReference).doc(uid).update({
      [position]: firebase.default.firestore.FieldValue.increment(1)
    });
  }

  public getRaces (): Observable<any> {
    return this.firestore.collection(FirestoreReferencesEnum.raceCollectionReference, ref => ref.orderBy('date', 'desc')).valueChanges();
  }
}
