import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  title = 'RecycleHub';
  sideBarOpen = true;

  ngOnInit(): void {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
