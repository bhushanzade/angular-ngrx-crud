import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface IBlog {
  title: string;
  content: string;
}

export class Blog implements IBlog {
  _id: string = '';
  title: string = '';
  content: string = '';
  slug: string = '';
}

export interface IBlogs extends EntityState<Blog> {
  isLoaded: boolean;
  count: number;
  blog: Blog | null;
  slug: string;
}

export interface IBlogSate {
  blogs: IBlogs,
  blog_detail: {
    blog: Blog | null,
    slug: string
  }
}

export interface BlogEntityState extends EntityState<Blog> {
  isLoaded: boolean;
  count: number;
  blog: Blog | null;
  slug: string;
}

export const blogEntityAdapter = createEntityAdapter<Blog>({
  selectId: (x: Blog) => x._id
});

export const initialBlogEntityState: IBlogs = blogEntityAdapter.getInitialState({
  isLoaded: false,
  count: 0,
  blog: null,
  slug: ''
});



export interface BlogDetailEntityState {
  blog: Blog | null;
  slug: string;
}

export const blogDetailEntityAdapter = createEntityAdapter<BlogDetailEntityState>();

export const initialBlogDetailEntityState: BlogDetailEntityState = blogDetailEntityAdapter.getInitialState({
  blog: null,
  slug: ''
});