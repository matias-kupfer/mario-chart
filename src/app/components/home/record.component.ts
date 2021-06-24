import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import { Race } from '../../interfaces/race';
import { CustomUser } from '../../interfaces/customUser';


@Component({
  selector: 'app-home',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  races!: Race[];
  users!: CustomUser[];
  loading: boolean = true;

  constructor (
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) { }

  ngOnInit (): void {
    this.loaderService.show();
    this.firestoreService.getRaces().subscribe((races) => {
      this.races = races;
      this.firestoreService.getUsersStream().subscribe((users) => {
        this.loaderService.hide();
        this.users = users;
        this.loading = false;
      });
    });
  }
}
