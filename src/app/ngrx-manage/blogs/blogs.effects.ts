import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpErrorHandle } from "../app/app.action";
import { environment } from "src/environments/environment";
import { BlogAddAction, BlogAddCompleteAction, BlogDeleteAction, BlogDeleteCompleteAction, BlogDetailAction, BlogDetailCompleteAction, BlogEditAction, BlogEditCompleteAction, BlogsFetchAction, BlogsFetchCompleteAction, UserBlogsActionTypes } from "./blogs.action";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class BlogsEffect {

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
  }

  blogs$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOGS_FETCH_START),
      exhaustMap((action: BlogsFetchAction) => {
        const url = environment.base_url + 'blogs';
        return this.http.get<any>(url, { params: action.payload }).pipe(map(data => {
          return new BlogsFetchCompleteAction(data);
        }))
      })
    )
  });

  blogDetail$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_DETIAL_START),
      exhaustMap((action: BlogDetailAction) => {
        const url = environment.base_url + 'blogs/' + action.slug;
        return this.http.get<any>(url).pipe(map(data => {
          return new BlogDetailCompleteAction(data);
        }))
      })
    )
  })

  addBlog$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_ADD_START),
      exhaustMap((action: BlogAddAction) =>
        this.http.post<any>(environment.base_url + 'blogs/create', action.payload).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return new BlogAddCompleteAction(data);
          })
        ))
    ),
    {
      dispatch: true
    });

  editBlog$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserBlogsActionTypes.BLOG_EDIT_START),
      exhaustMap((action: BlogEditAction) => {
        const url = environment.base_url + 'blogs/update/' + action.slug;
        return this.http.put<any>(url, action.payload).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return new BlogEditCompleteAction(data);
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
      exhaustMap((action: BlogDeleteAction) => {
        const url = environment.base_url + 'blogs/delete/' + action.slug;
        return this.http.delete<any>(url).pipe(
          map((data) => {
            this.router.navigateByUrl('/blogs');
            return new BlogDeleteCompleteAction(data.slug);
          })
        )
      })
    ),
    {
      dispatch: true
    });

}