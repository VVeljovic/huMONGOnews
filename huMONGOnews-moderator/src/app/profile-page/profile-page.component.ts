import { JsonPipe, CommonModule } from '@angular/common';
import { Moderator } from './../models/moderator.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, JsonPipe],
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
