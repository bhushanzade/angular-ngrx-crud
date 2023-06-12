import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogsAddEditComponent } from './blogs-add-edit/blogs-add-edit.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDataService } from './states/blogs-data.service';
import { EntityDataService } from '@ngrx/data';

const routes: Routes = [
  {
    path: '',
    component: AllBlogsComponent
  },
  {
    path: 'add',
    component: BlogsAddEditComponent
  },
  {
    path: ':slug',
    component: BlogDetailsComponent
  },
  {
    path: 'edit/:slug',
    component: BlogsAddEditComponent
  }
]

@NgModule({
  declarations: [
    AllBlogsComponent,
    BlogsAddEditComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DataBlogsModule {
  constructor(
    entityService: EntityDataService,
    blogService: BlogDataService
  ) {
    entityService.registerService('Blog', blogService);
  }
}
