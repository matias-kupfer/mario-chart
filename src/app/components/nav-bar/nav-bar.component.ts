import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ToggleThemeService} from '../../core/services/toggle-theme.service';
import { AuthService } from '../../core/services/firebase/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() title: any;
  public showLoader = false;

  toggleControl = new FormControl(true);
  @HostBinding('class') className = '';

  constructor(private toggleService: ToggleThemeService, public authService: AuthService) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((toggleState) => {
      this.toggleService.toggle(toggleState);
    });
  }

}
