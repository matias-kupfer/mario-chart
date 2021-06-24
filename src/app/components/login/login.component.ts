import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/firebase/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomUser } from '../../interfaces/customUser';
import { ConfigEnum } from '../../enums/config.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor (
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    if (this.authService.user$.getValue()) {
      this._snackBar.open('Already logged in', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: ConfigEnum.snackbarMS
      });
      this.router.navigate(['/profile']);
    }
  }

  public login () {
    this.authService.login(this.email, this.password).then((r) => {
      if (r.user) {
        this.authService.getUserData(r.user?.uid).subscribe((user) => {
          this.authService.user$.next(user.data() as CustomUser);
          this._snackBar.open('Welcome, ' + user.data()?.name, '', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: ConfigEnum.snackbarMS
          });
          this.router.navigate(['/profile']);
        });
      }
    }).catch((e) => {
      this._snackBar.open('Something went wrong', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: ConfigEnum.snackbarMS
      });
    });
  }
}
