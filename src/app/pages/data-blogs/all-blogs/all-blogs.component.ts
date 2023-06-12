import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/ngrx-manage/blogs/bogs.state';
import { BlogEntityService } from '../states/blogs-entity.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  $items!: Observable<Blog[]>;
  constructor(
    private service: BlogEntityService,
  ) {
  }

  ngOnInit(): void {
    this.service.loaded$.subscribe(bool => {
      if (bool) {
        this.$items = this.service.entities$;
      } else {
        this.$items = this.service.getAll();
      }
    })
  }

}
