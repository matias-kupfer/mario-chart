import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { CustomUser } from '../../interfaces/customUser';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import firebase from 'firebase';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: CustomUser[];

  constructor (
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    this.loaderService.show();
    this.firestoreService.getUsersStream().subscribe((data) => {
      this.loaderService.hide();
      this.users = data;
    });
  }

  ngOnInit (): void {

  }


}
