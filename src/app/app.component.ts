import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  routes: Routes = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config;
  }
}
