import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { Blog } from 'src/app/ngrx-manage/blogs/bogs.state';
import { getCurrentRoute } from 'src/app/ngrx-manage/router/router.selector';
import { BlogEntityService } from '../states/blogs-entity.service';
import { ofType } from '@ngrx/effects';
import { EntityAction } from '@ngrx/data';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  $model!: Observable<Blog>;

  constructor(
    private store: Store<any>,
    private service: BlogEntityService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.store.select(getCurrentRoute).pipe(take(1)).subscribe(route => {
      if (route.params['slug']) {
        this.$model = this.service.getByKey(route.params['slug']);
      }
    })
  }

  deleteBlog(blog: Blog): void {
    if (confirm("Do you really want to delete this blog?")) {
      this.service.delete(blog).subscribe(data => {
        this.router.navigateByUrl('/data-blogs');
      })
    }
  }

}
