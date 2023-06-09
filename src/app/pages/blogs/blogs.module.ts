import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogsAddEditComponent } from './blogs-add-edit/blogs-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { BlogsEffect } from 'src/app/ngrx-manage/blogs/blogs.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogsEnitityEffect } from 'src/app/ngrx-manage/blog_entity/blogs.effects';

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
    EffectsModule.forFeature([BlogsEnitityEffect]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogsModule { }
