import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  EMPTY,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Article } from '../models/article.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { environment } from '../../environments/environment.development';
import { GeoObject } from '../models/geo-object.model';
import { ToastrService } from 'ngx-toastr';
import { Moderator } from '../models/moderator.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

interface SelectEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}

export interface RemoveEvent {
  originalEvent: Event;
  file: File;
}

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: any;
}

export type Base64String = string;

@Component({
  selector: 'app-article-metadata-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    HttpClientModule,
    AutoCompleteModule,
    AsyncPipe,
  ],
  templateUrl: './article-metadata-form.component.html',
  styleUrl: './article-metadata-form.component.css',
  providers: [HttpClient, ArticleService, CategoryService],
})
export class ArticleMetadataFormComponent implements OnInit, OnDestroy {
  @Input()
  public article: Article = {} as Article;
  unsubsrciber$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.suggestions$ = this.queryString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((queryString) => queryString.length >= 2),
      switchMap((queryString: string) => {
        return this.http.get<{ results: GeoObject[] }>(
          `${environment.geoApi.url}/autocomplete?text=${queryString}&format=json&apiKey=${environment.geoApi.KEY}`
        );
      }),
      map((response) => {
        return response.results.map((geoobj: GeoObject) => {
          return {
            name: geoobj.formatted,
            lon: geoobj.lon,
            lat: geoobj.lat,
          };
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubsrciber$.next();
    this.unsubsrciber$.complete();
  }

  //#region Categories

  public allCategories$!: Observable<any[]>;
  public selectedCategory: any | undefined;

  loadCategories() {
    this.allCategories$ = this.categoryService
      .findAllCategories()
      .pipe(tap(console.log));
  }

  saveCategory(event: AutoCompleteSelectEvent) {
    this.article.categoryId = (event.value as Category)._id;
  }

  //#endregion !Categories

  //#region FileUpload

  selectedFiles: File[] = []; // just for viewing

  onSelect(event: SelectEvent) {
    const file: File = event.files[0];
    this.selectedFiles = [file];

    if (file) {
      this.fileToBase64(file).then((base64String) => {
        this.article.titleImage = base64String;
      });
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String: string = reader.result as string;
        const base64Data: string = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  onClear() {
    this.article.titleImage = '';
    this.selectedFiles = [];
  }

  onRemove(removeEvent: RemoveEvent) {
    this.article.titleImage = '';
    this.selectedFiles = [];
  }

  //#endregion !FileUpload

  //#region GeoSuggestions

  items: any[] | undefined;
  selectedItem: any;
  suggestions$!: Observable<any[]>;
  suggestionsMapped$!: Observable<string[]>;

  public queryString$ = new Subject<string>();

  getSuggestions(keyboardEvent: KeyboardEvent) {
    const queryString = (keyboardEvent.target as HTMLInputElement).value;
    this.queryString$.next(queryString);
  }

  saveLonLat(event: AutoCompleteSelectEvent) {
    const { lon, lat } = event.value;
    this.article.location = {
      type: 'Point',
      coordinates: [lon, lat],
    };
  }

  //#endregion

  onSubmit() {
    // Creating article from form input
    this.article.dateCreated = new Date();
    this.article.moderator = (
      JSON.parse(sessionStorage.getItem('moderator') ?? '') as Moderator
    )._id!;
    this.article.contents = '';
    this.article.state = 'DRAFT';

    // Create article API call

    this.articleService
      .createArticle(this.article)
      .pipe(
        takeUntil(this.unsubsrciber$),
        catchError((err) => {
          console.log(err);
          this.toastr.error(`Article creation unsucessful!`, 'Error');
          return EMPTY;
        })
      )
      .subscribe((article: Article) => {
        if (article) {
          this.toastr.success(
            `Created article ${this.article.title}`,
            'Success'
          );
          this.router.navigate([
            '/moderator-dashboard',
            'create-article',
            article._id,
          ]);
        }
      });
  }
}
