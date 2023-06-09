import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BlogAddAction, BlogAddCompleteAction, BlogDeleteAction, BlogDeleteCompleteAction, BlogDetailAction, BlogDetailCompleteAction, BlogEditAction, BlogEditCompleteAction, BlogsFetchAction, BlogsFetchCompleteAction, UserBlogsActionTypes } from "./blogs.action";
import { Router } from "@angular/router";


@Injectable()
export class BlogsEnitityEffect {

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
  }

  blogs$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOGS_FETCH_START),
      exhaustMap(() => {
        const url = environment.base_url + 'blogs';
        return this.http.get<any>(url).pipe(map(data => {
          return BlogsFetchCompleteAction({ payload: data });
        }))
      })
    )
  });

  blogDetail$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_DETIAL_START),
      exhaustMap((payload: any) => {
        const url = environment.base_url + 'blogs/' + payload.slug;
        return this.http.get<any>(url).pipe(map(data => {
          return BlogDetailCompleteAction({ payload: data });
        }))
      })
    )
  })

  addBlog$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_ADD_START),
      exhaustMap((payload) => {
        console.log(payload);
        return this.http.post<any>(environment.base_url + 'blogs/create', payload).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return BlogAddCompleteAction({ payload: data });
          })
        )
      })
    ),
    {
      dispatch: true
    });

  editBlog$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_EDIT_START),
      exhaustMap((object: any) => {
        const url = environment.base_url + 'blogs/update/' + object.slug;
        return this.http.put<any>(url, object.payload).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return BlogEditCompleteAction({ payload: data });
          })
        )
      })
    ),
    {
      dispatch: true
    });

  deleteBlog$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_DELETE_START),
      exhaustMap((object: any) => {
        const url = environment.base_url + 'blogs/delete/' + object.slug;
        return this.http.delete<any>(url).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return BlogDeleteCompleteAction({ slug: data.slug });
          })
        )
      })
    ),
    {
      dispatch: true
    });

}