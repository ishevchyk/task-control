import {Injectable, ViewChild} from '@angular/core';
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective

  error: string =  null;
  private closeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError)
  }

  showErrorAlert(message: string, host: PlaceholderDirective) {
    const viewContainerRef = host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.onHandleError();
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    })
  }

}
