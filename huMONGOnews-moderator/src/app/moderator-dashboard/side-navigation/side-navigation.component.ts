import { CommonModule, JsonPipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { ToastrService } from 'ngx-toastr';
import { Moderator } from '../../models/moderator.model';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ArticleMetadataFormComponent } from '../../article-metadata-form/article-metadata-form.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Category } from '../../models/category.model';
import { Form, FormControl, FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    RouterLink,
    RouterLinkActive,
    DynamicDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css',
  providers: [DialogService, CategoryService],
})
export class SideNavigationComponent implements OnInit {
  @HostBinding('class.expanded') expanded: boolean = false;
  public moderator!: Moderator;
  articleMetadataDialogRef?: DynamicDialogRef;
  public visible: boolean = false;

  public category: Category = {} as Category;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dialog: DialogService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.moderator = JSON.parse(sessionStorage.getItem('moderator') ?? '');
    if (!this.moderator) throw Error(`Moderator initialization failed!`);
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
  }

  createNewArticleDraft() {
    this.articleMetadataDialogRef = this.dialog.open(
      ArticleMetadataFormComponent,
      {
        closable: true,
        draggable: false,
        header: 'Enter article information',
        width: '50%',
        modal: true,
      }
    );
  }

  logOut() {
    sessionStorage.removeItem('moderator');
    this.toastr.info('You logged out.', 'Info');
    this.router.navigate(['log-in']);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  createCategory(categoryForm: NgForm) {
    this.categoryService.createCategory(this.category).subscribe(console.log);
    categoryForm.resetForm();
    this.hideDialog();
  }
}
