import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, of, switchMap, take, takeLast } from 'rxjs';
import { BlogDeleteAction, BlogDetailAction } from 'src/app/ngrx-manage/blogs/blogs.action';
import { getUserBlogData, getUserBlogSlug, getUserBlogsData } from 'src/app/ngrx-manage/blogs/blogs.selector';
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
    this.$model = this.store.select(getUserBlogData) as Observable<Blog>;
  }

  ngOnInit(): void {
    this.store.select(getUserBlogSlug).pipe(take(1)).subscribe(data => {
      if (data.slugChange) {
        this.store.dispatch(new BlogDetailAction(data.slug));
      }
    })
  }

  deleteBlog(slug: string): void {
    if (confirm("Do you really want to delete this blog?")) {
      this.store.dispatch(new BlogDeleteAction(slug));
    }
  }

}
