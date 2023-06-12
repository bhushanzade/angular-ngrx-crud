import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Blog } from "./blogs.state";
import { Injectable } from "@angular/core";

@Injectable({
  "providedIn": 'root'
})
export class BlogEntityService extends EntityCollectionServiceBase<Blog> {
  constructor(service: EntityCollectionServiceElementsFactory) {
    super('Blog', service);
  }
}