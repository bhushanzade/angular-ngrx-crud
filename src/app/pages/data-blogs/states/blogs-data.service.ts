import { DefaultDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, HttpUrlGenerator } from "@ngrx/data";
import { Blog } from "./blogs.state";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Update } from "@ngrx/entity";

@Injectable({
  "providedIn": 'root'
})
export class BlogDataService extends DefaultDataService<Blog> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Blog', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    const url = environment.base_url + 'blogs';
    return this.http.get(url).pipe(map((data: any) => data.items));
  }

  override getById(slug: string): Observable<any> {
    const url = environment.base_url + 'blogs/' + slug;
    return this.http.get(url);
  }

  override update(object: Update<Blog>): Observable<any> {
    const url = environment.base_url + 'blogs/update/' + object.id;
    return this.http.put(url, object.changes).pipe(map((data: any) => {
      return data.data;
    }));
  }

  override add(object: Blog): Observable<any> {
    const url = environment.base_url + 'blogs/create';
    return this.http.post(url, object).pipe(map((data: any) => {
      return data.data;
    }));
  }

  override delete(slug: string): Observable<any> {
    const url = environment.base_url + 'blogs/delete/' + slug;
    return this.http.delete(url);
  }

}