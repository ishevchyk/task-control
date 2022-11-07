import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
  }

  onGettingStarted() {
    this.router.navigate(['signup'], {relativeTo: this.route})
  }

  // onSignIn() {
  //   this.router.navigate(['login'], {relativeTo: this.route})
  // }
}
