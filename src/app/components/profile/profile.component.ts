import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/firebase/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { CustomUser } from '../../interfaces/customUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigEnum } from '../../enums/config.enum';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: CustomUser | null;

  constructor (
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.user = this.authService.user$.getValue();
  }

  ngOnInit (): void {
  }


  public logout () {
    this.authService.logout().then(() => {
      this.authService.user$.next(null);
      this._snackBar.open('Goodbye', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: ConfigEnum.snackbarMS
      });
      this.router.navigate(['/login']);
    }).catch((e) => {
      this._snackBar.open('Something whent wrong', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: ConfigEnum.snackbarMS
      });
    });
  }
}
