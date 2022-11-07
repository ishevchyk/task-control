import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";

import * as fromApp from '../store/app.reducer'


console.log('guard')
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .select('auth')
      .pipe(
        take(1),
        map(authState => {
          return authState.user
        }),
        map(user => {
          console.log(user)
          const isAuthenticated = !!user;
          console.log(isAuthenticated)
          if(isAuthenticated) {
            return true;
          }
          return this.router.createUrlTree(['/auth'])
        })
      )
  }
}