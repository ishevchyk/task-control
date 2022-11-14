import { Component, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string;
  private userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map(authState => authState.user)
      )
      .subscribe(user => {
        if(user) {
          this.isLoggedIn = !!user;
          this.username = user.username;
        }
      })
  }

  onLogout() { this.store.dispatch( new AuthActions.Logout() )}

}
