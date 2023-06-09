import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { BlogDeleteAction, BlogDetailAction } from 'src/app/ngrx-manage/blog_entity/blogs.action';
import { getUserBlogDetailEnitityState, getUserBlogDetailSlugEnitityState } from 'src/app/ngrx-manage/blog_entity/blogs.selector';
import { Blog } from 'src/app/ngrx-manage/blogs/bogs.state';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  $model: Observable<Blog>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.$model = this.store.select(getUserBlogDetailEnitityState) as Observable<Blog>;
  }

  ngOnInit(): void {
    this.store.select(getUserBlogDetailSlugEnitityState).pipe(take(1)).subscribe(data => {
      if (data.slugChange) {
        this.store.dispatch(BlogDetailAction({ slug: data.slug }));
      }
    })
  }

  deleteBlog(slug: string): void {
    if (confirm("Do you really want to delete this blog?")) {
      this.store.dispatch(BlogDeleteAction({ slug }));
    }
  }

}
