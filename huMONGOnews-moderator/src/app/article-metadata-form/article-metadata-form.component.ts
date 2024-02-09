import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Article } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { environment } from '../../environments/environment.development';
import { GeoObject } from '../models/geo-object.model';
import { ToastrService } from 'ngx-toastr';
import { Moderator } from '../models/moderator.model';

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
    AutoCompleteModule,
    AsyncPipe,
  ],
  templateUrl: './article-metadata-form.component.html',
  styleUrl: './article-metadata-form.component.css',
  providers: [HttpClient],
})
export class ArticleMetadataFormComponent implements OnInit {
  @Input()
  public article: Article = {} as Article;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
    this.article.dateCreated = new Date();
    this.article.moderator = (
      JSON.parse(sessionStorage.getItem('moderator') ?? '') as Moderator
    )._id!;
    this.article.contents = '';
    this.article.state = 'DRAFT';

    this.toastr.success(`Created article ${this.article.title}`, 'Success');

    console.log(this.article);
  }
}
