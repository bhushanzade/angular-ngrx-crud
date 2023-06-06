import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogsFetchAction } from 'src/app/ngrx-manage/blogs/blogs.action';
import { getUserBlogsData, getUserBlogsLoadedState } from 'src/app/ngrx-manage/blogs/blogs.selector';
import { IBlog, IBlogs } from 'src/app/ngrx-manage/blogs/bogs.state';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  $model!: Observable<IBlogs>;
  constructor(
    private store: Store
  ) {
    this.store.select(getUserBlogsLoadedState).subscribe(bool => {
      if (bool) {
        this.$model = this.store.select(getUserBlogsData) as Observable<IBlogs>
      } else {
        this.store.dispatch(new BlogsFetchAction([]));
      }
    })
  }

  ngOnInit(): void {
  }

}
