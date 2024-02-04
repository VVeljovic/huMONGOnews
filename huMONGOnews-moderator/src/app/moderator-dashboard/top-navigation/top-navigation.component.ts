import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule, FeatherModule, FormsModule, AsyncPipe],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css',
})
export class TopNavigationComponent implements OnInit {
  public searchString$ = new Subject<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchString$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(console.log);
  }

  onSearch(searchString: string) {
    this.searchString$.next(searchString);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
