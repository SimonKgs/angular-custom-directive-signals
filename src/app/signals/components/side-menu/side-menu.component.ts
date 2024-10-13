import { Component, signal } from '@angular/core';


interface MenuItem {
  title: string;
  route: string;
}


@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  // traditional menu
  // public menuItems: MenuItem[] = [
  //   { title: 'Counter', route: 'counter'},
  //   { title: 'User info', route: 'user-info'},
  //   { title: 'Properties', route: 'properties'},
  // ];
  // USING SIGNALS
  public menuItems = signal<MenuItem[]>([
    { title: 'Counter', route: 'counter'},
    { title: 'User info', route: 'user-info'},
    { title: 'Properties', route: 'properties'},
  ])
}
