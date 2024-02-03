import { Component } from '@angular/core';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';

@Component({
  selector: 'app-moderator-dashboard',
  standalone: true,
  imports: [TopNavigationComponent, SideNavigationComponent],
  templateUrl: './moderator-dashboard.component.html',
  styleUrl: './moderator-dashboard.component.css',
})
export class ModeratorDashboardComponent {}
