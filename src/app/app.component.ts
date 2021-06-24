import { Component, HostBinding, OnInit } from '@angular/core';
import { ToggleThemeService } from './core/services/toggle-theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './core/services/firebase/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRaceComponent } from './shared/add-race/add-race.component';
import { FirestoreService } from './core/services/firebase/firestore.service';
import { CustomUser } from './interfaces/customUser';
import { LoaderService } from './core/services/loader.service';
import { DialogData } from './interfaces/dialogData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigEnum } from './enums/config.enum';
import { Race } from './interfaces/race';
import { PositionsEnum } from './enums/positions.enum';
import { DocumentData } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mario-chart';

  public showLoader = false;

  @HostBinding('class') className = 'darkMode';

  constructor (
    private overlay: OverlayContainer,
    private toggleTheme: ToggleThemeService,
    public authService: AuthService,
    public firestoreService: FirestoreService,
    public loaderService: LoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.loaderService.loaderState$.subscribe(state => this.showLoader = state);
  }

  public ngOnInit (): void {
    this.toggleTheme.darkMode.subscribe((darkMode: boolean) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  public addRace () {
    const users: CustomUser[] = [];
    this.loaderService.show();
    this.firestoreService.getUsers().subscribe((data: DocumentData) => {
      this.loaderService.hide();
      data.docs.forEach((user: any) => {
        users.push(user.data());
      });
      const dialogRef = this.dialog.open(AddRaceComponent, {
        width: '250px',
        data: { users: users, race: null }
      });
      dialogRef.afterClosed().subscribe((result: DialogData) => {
        if (!result || !result.race) {
          return;
        }
        this.firestoreService.saveRace(result.race).then((r) => {
          this.increaseUserStats(result.race).then((r) => {
            this._snackBar.open('Users stats updated successfully', 'dismiss', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: ConfigEnum.snackbarMS
            });
          }).catch((e) => {
            this._snackBar.open('Something went wrong', 'dismiss', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: ConfigEnum.snackbarMS
            });
          });
          this._snackBar.open('Race saved!', 'dismiss', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: ConfigEnum.snackbarMS
          });
        }).catch((e) => {
          this._snackBar.open('Something went wrong', 'dismiss', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: ConfigEnum.snackbarMS
          });
        });
      });
    });
  }

  async increaseUserStats (race: Race) {
    await this.firestoreService.increaseUserStats(race.first, PositionsEnum.firstPosition);
    await this.firestoreService.increaseUserStats(race.second, PositionsEnum.secondPosition);
    await this.firestoreService.increaseUserStats(race.third, PositionsEnum.thirdPosition);
    if (race.fourth) {
      await this.firestoreService.increaseUserStats(race.fourth, PositionsEnum.fourthPosition);
    }
  }
}
