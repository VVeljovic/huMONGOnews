import { JsonPipe, CommonModule } from '@angular/common';
import { Moderator } from './../models/moderator.model';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  public moderator!: Moderator;

  constructor() {}

  ngOnInit(): void {
    this.moderator = JSON.parse(sessionStorage.getItem('moderator') ?? '');

    if (!this.moderator) throw Error('Error loading the moderator!');
  }
}
