import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { ApplicationState } from 'src/app/ngrx-manage/app/app.state';
import { BlogAddAction, BlogDetailAction, BlogEditAction } from 'src/app/ngrx-manage/blogs/blogs.action';
import { getUserBlogData, getUserBlogSlug } from 'src/app/ngrx-manage/blogs/blogs.selector';
import { Blog, IBlog } from 'src/app/ngrx-manage/blogs/bogs.state';

@Component({
  selector: 'app-blogs-add-edit',
  templateUrl: './blogs-add-edit.component.html',
  styleUrls: ['./blogs-add-edit.component.scss']
})
export class BlogsAddEditComponent implements OnInit {

  reativeForm: FormGroup;
  slug: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.reativeForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.store.select(getUserBlogSlug).pipe(take(1)).subscribe(data => {
      this.slug = data.slug;
      if (data.slugChange) {
        this.store.dispatch(new BlogDetailAction(data.slug));
      }
      const subscribe: Subscription = this.store.select(getUserBlogData).subscribe(
        {
          complete: () => subscribe.unsubscribe(), // completeHandler
          next: (res) => {
            if (res && this.slug) {
              this.reativeForm.setValue({
                title: res.title,
                content: res.content
              });
              this.reativeForm.updateValueAndValidity();
            }
          },
        }
      )
    });
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
      this.store.dispatch(new BlogEditAction(this.reativeForm.value, this.slug))
    }
    else this.store.dispatch(new BlogAddAction(this.reativeForm.value));
  }

}
