
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TokenInterceptorService} from "./shared/token-interceptor.service";

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WorkspaceEffects } from "./features/workspace/store/workspace.effects";
import { AuthEffects } from './auth/store/auth.effects';
import { ListEffects } from "./features/lists/store/list.effects";
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, WorkspaceEffects, ListEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
