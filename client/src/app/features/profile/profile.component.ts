import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import {map} from "rxjs";
import {User} from "../../auth/User.model";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: User

  constructor(
    private store: Store<fromApp.AppState>
  ) { }



  ngOnInit(): void {
    this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.userProfile = user;
    })
  }

}
