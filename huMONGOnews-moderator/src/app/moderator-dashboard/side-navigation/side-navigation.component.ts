import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css',
  providers: [],
})
export class SideNavigationComponent {
  @HostBinding('class.expanded') expanded: boolean = false;
}
