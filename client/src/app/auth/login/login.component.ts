import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string =  null;
  @ViewChild(PlaceholderDirective, {static: false}) loginAlert: PlaceholderDirective

  private storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth')
      .subscribe(authState => {
        this.error = authState.authError;
        if(this.error) {
          this.authService.showErrorAlert(this.error, this.loginAlert)
        }
      })
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    form.reset()
  }

}
