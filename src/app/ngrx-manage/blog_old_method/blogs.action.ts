import { Action } from "@ngrx/store";
import { IBlog } from "./bogs.state";

export enum UserBlogsActionTypes {
  BLOGS_FETCH_START = '[USER BLOGS] BLOGS_FETCH_START',
  BLOGS_FETCH_COMPLETE = '[USER BLOGS] BLOGS_FETCH_COMPLETE',
  BLOG_ADD_START = '[USER BLOGS] BLOGS_ADD_START',
  BLOGS_ADD_COMPLETE = '[USER BLOGS] BLOGS_ADD_COMPLETE',
  BLOG_EDIT_START = '[USER BLOGS] BLOGS_EDIT_START',
  BLOGS_EDIT_COMPLETE = '[USER BLOGS] BLOGS_EDIT_COMPLETE',
  BLOG_DETIAL_START = '[USER BLOGS] BLOG_DETIAL_START',
  BLOG_DETIAL_COMPLETE = '[USER BLOGS] BLOG_DETIAL_COMPLETE',
  BLOG_DELETE_START = '[USER BLOGS] BLOG_DELETE_START',
  BLOG_DELETE_COMPLETE = '[USER BLOGS] BLOG_DELETE_COMPLETE',
}

export class BlogsFetchAction implements Action {
  readonly type = UserBlogsActionTypes.BLOGS_FETCH_START;
  constructor(public payload: any) { }
}

export class BlogsFetchCompleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOGS_FETCH_COMPLETE;
  constructor(public payload: any) { }
}

export class BlogDetailAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_DETIAL_START;
  constructor(public slug: string) { }
}

export class BlogDetailCompleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_DETIAL_COMPLETE;
  constructor(public payload: any) { }
}

export class BlogAddAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_ADD_START;
  constructor(public payload: IBlog) { }
}

export class BlogAddCompleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOGS_ADD_COMPLETE;
  constructor(public payload: any) { }
}

export class BlogEditAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_EDIT_START;
  constructor(public payload: IBlog, public slug: string) { }
}

export class BlogEditCompleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOGS_EDIT_COMPLETE;
  constructor(public payload: any) { }
}

export class BlogDeleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_DELETE_START;
  constructor(public slug: string) { }
}

export class BlogDeleteCompleteAction implements Action {
  readonly type = UserBlogsActionTypes.BLOG_DELETE_COMPLETE;
  constructor(public slug: string) { }
}


export type UserBlogActions
  = BlogsFetchAction
  | BlogsFetchCompleteAction | BlogAddAction | BlogAddCompleteAction
  | BlogDetailAction | BlogDetailCompleteAction | BlogEditAction | BlogEditCompleteAction
  | BlogDeleteAction | BlogDeleteCompleteAction;