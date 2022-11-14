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
  ) { }

  ngOnInit(): void {
  }

  onGettingStarted() {
    this.router.navigate(['signup'], {relativeTo: this.route})
  }
}
