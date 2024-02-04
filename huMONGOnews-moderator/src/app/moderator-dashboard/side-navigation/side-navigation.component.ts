import { CommonModule, JsonPipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { ToastrService } from 'ngx-toastr';
import { Moderator } from '../../models/moderator.model';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, FeatherModule, RouterLink, RouterLinkActive],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css',
  providers: [],
})
export class SideNavigationComponent implements OnInit {
  @HostBinding('class.expanded') expanded: boolean = false;
  public moderator!: Moderator;

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.moderator = JSON.parse(sessionStorage.getItem('moderator') ?? '');
    if (!this.moderator) throw Error(`Moderator initialization failed!`);
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
  }

  logOut() {
    sessionStorage.removeItem('moderator');
    this.toastr.info('You logged out.', 'Info');
    this.router.navigate(['log-in']);
  }
}
