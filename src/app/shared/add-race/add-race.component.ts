import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { DialogData } from '../../interfaces/dialogData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Race } from '../../interfaces/race';
import firebase from 'firebase';
import { AuthService } from '../../core/services/firebase/auth.service';
import Timestamp = firebase.firestore.Timestamp;
import { CustomUser } from '../../interfaces/customUser';


@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.scss']
})
export class AddRaceComponent implements OnInit {
  form: FormGroup;
  selectedUsers: string[] = [];

  constructor (
    private authService: AuthService,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = new FormGroup({
      first: new FormControl(null, [
        Validators.required
      ]),
      second: new FormControl(null, [
        Validators.required
      ]),
      third: new FormControl(null, [
        Validators.required
      ]),
      fourth: new FormControl(null, [])
    });
  }

  ngOnInit (): void {
  }

  onNoClick (): void {
    this.dialogRef.close();
  }

  onSave () {
    this.data.race = {
      date: Timestamp.now(),
      first: this.first,
      second: this.second,
      third: this.third,
      fourth: this.fourth,
      // @ts-ignore
      createdBy: this.authService.user$.getValue().id
    };
    this.dialogRef.close(this.data);
  }

  get first () {
    return this.form.get('first')?.value;
  }

  get second () {
    return this.form.get('second')?.value;
  }

  get third () {
    return this.form.get('third')?.value;
  }

  get fourth () {
    return this.form.get('fourth')?.value;
  }

  public selected() {
    this.selectedUsers = [];
    this.selectedUsers.push(this.first);
    this.selectedUsers.push(this.second);
    this.selectedUsers.push(this.third);
    this.selectedUsers.push(this.fourth);
  }

  public alreadySelected(user: CustomUser) {
    const found = this.selectedUsers.find((r) => r === user.id);
    return !!found;
  }

}
