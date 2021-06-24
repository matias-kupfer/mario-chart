import { Component, Input, OnInit } from '@angular/core';
import { CustomUser } from '../../interfaces/customUser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: CustomUser;
  @Input() first!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
