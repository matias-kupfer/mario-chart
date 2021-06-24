import { Component, Input, OnInit } from '@angular/core';
import { Race } from '../../interfaces/race';
import { CustomUser } from '../../interfaces/customUser';


@Component({
  selector: 'app-race-card',
  templateUrl: './race-card.component.html',
  styleUrls: ['./race-card.component.scss']
})
export class RaceCardComponent implements OnInit {
  @Input() race!: Race;
  @Input() users!: CustomUser[];

  constructor () {
  }

  ngOnInit (): void {
  }

  getUserById (uid: string): string {
    const user = this.users.find(user => user.id === uid);
    return user ? user.name : 'Not found';
  }

  getUserImage (uid: string): string {
    const user = this.users.find(user => user.id === uid);
    return user ? user.imageUrl : 'Not found';
  }

}
