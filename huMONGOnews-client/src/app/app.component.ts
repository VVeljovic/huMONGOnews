import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FrontPageComponent,CategoryPostsComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'huMONGOnews-client';
}
