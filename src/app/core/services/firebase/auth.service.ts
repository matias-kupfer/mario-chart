import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import firebase from 'firebase';
import User = firebase.User;
import { CustomUser } from '../../../interfaces/customUser';
import { DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { LoaderService } from '../loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: BehaviorSubject<CustomUser | null> = new BehaviorSubject<CustomUser | null>(null);

  constructor (
    private fireAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private loaderService: LoaderService
  ) {
    this.loaderService.show();
    this.authUser().subscribe((user: User | null) => {
      if (user) {
        this.getUserData(user.uid).subscribe((user) => {
          this.user$.next(user.data() as CustomUser);
          this.loaderService.hide();
        });
      } else {
        this.loaderService.hide();
      }
    });
  }

  public login (email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public register (email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public getUserData (uid: string) {
    return this.firestoreService.getUserById(uid);
  }

  public authUser (): Observable<User | null> {
    return this.fireAuth.authState;
  }

  public logout () {
    return this.fireAuth.signOut();
  }
}
