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

export interface IBlogs {
  isLoaded: boolean;
  count: number;
  items: Blog[];
}

export interface IBlogSate {
  blogs: IBlogs,
  blog_detail: {
    blog: Blog | null,
    slug: string
  }
}

export const initialBlogState: IBlogSate = {
  blogs: {
    isLoaded: false,
    count: 0,
    items: []
  },
  blog_detail: {
    blog: null,
    slug: ''
  }
}