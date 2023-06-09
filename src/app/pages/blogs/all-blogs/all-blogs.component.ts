import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogsFetchAction } from 'src/app/ngrx-manage/blog_entity/blogs.action';
import { getUserBlogsEnitityData, getUserBlogsEnitityLoadedState } from 'src/app/ngrx-manage/blog_entity/blogs.selector';
import { IBlogs } from 'src/app/ngrx-manage/blog_entity/bogs.state';
import { Blog } from 'src/app/ngrx-manage/blogs/bogs.state';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  $items!: Observable<Blog[]>;
  constructor(
    private store: Store
  ) {
    this.store.select(getUserBlogsEnitityLoadedState).subscribe(bool => {
      if (bool) {
        this.$items = this.store.select(getUserBlogsEnitityData)
      } else {
        this.store.dispatch(BlogsFetchAction());
      }
    })
  }

  ngOnInit(): void {
  }

}
