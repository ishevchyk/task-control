import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {PlaceholderDirective} from "../../shared/placeholder.directive";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild(PlaceholderDirective, {static: false}) signupAlert: PlaceholderDirective

  error: string =  null;
  private storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth')
      .subscribe(authState => {
        this.error = authState.authError;
        if(this.error) {
          this.authService.showErrorAlert(this.error, this.signupAlert)
        }
      })
  }
  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.SignupStart({firstname: firstname, lastname: lastname, username: username, email: email, password: password}))
    form.reset()
  }

}
