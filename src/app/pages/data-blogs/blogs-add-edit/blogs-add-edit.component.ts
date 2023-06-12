import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { BlogAddAction, BlogDetailAction, BlogEditAction } from 'src/app/ngrx-manage/blog_entity/blogs.action';
import { getUserBlogDetailEnitityState, getUserBlogDetailSlugEnitityState } from 'src/app/ngrx-manage/blog_entity/blogs.selector';
import { BlogEntityService } from '../states/blogs-entity.service';
import { getCurrentRoute } from 'src/app/ngrx-manage/router/router.selector';
import { Update } from '@ngrx/entity';
import { Blog } from '../states/blogs.state';

@Component({
  selector: 'app-blogs-add-edit',
  templateUrl: './blogs-add-edit.component.html',
  styleUrls: ['./blogs-add-edit.component.scss']
})
export class BlogsAddEditComponent implements OnInit {

  reativeForm: FormGroup;
  slug: string = '';
  model: Blog = new Blog();

  constructor(
    private store: Store,
    private service: BlogEntityService,
    private router: Router
  ) {
    this.reativeForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.store.select(getCurrentRoute).pipe(take(1)).subscribe(route => {
      if (route.params['slug']) {
        this.slug = route.params['slug'];
        this.service.getByKey(route.params['slug']).pipe(take(1)).subscribe(data => {
          this.model = data;
          this.reativeForm.setValue({
            title: data.title,
            content: data.content
          });
          this.reativeForm.updateValueAndValidity();
        })
      }
    })
  }

  get f() {
    return this.reativeForm.controls;
  }

  onSave(): void {
    if (this.reativeForm.invalid) {
      this.reativeForm.markAllAsTouched();
      return;
    }
    if (this.slug) {
      const obj: Partial<Blog> = {
        _id: this.model._id,
        ...this.reativeForm.value
      }
      this.service.update(obj).pipe(take(1)).subscribe(res => {
        this.router.navigate(['/data-blogs/', res.slug])
      });
    }
    else {
      this.service.add(this.reativeForm.value).pipe(take(1)).subscribe(res => {
        this.router.navigate(['/data-blogs'])
      });
    }
  }

}
