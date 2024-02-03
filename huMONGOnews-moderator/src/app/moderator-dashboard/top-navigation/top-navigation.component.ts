import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css',
})
export class TopNavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
