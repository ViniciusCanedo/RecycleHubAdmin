import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RecycleHub';
  sideBarOpen = true;

  ngOnInit(): void {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


}
