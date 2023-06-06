import { UserBlogActions, UserBlogsActionTypes } from './blogs.action';
import { Blog, IBlogSate, IBlogs, initialBlogState } from './bogs.state';


export function BlogReducer(state: IBlogSate = initialBlogState, action: UserBlogActions): IBlogSate {
  switch (action.type) {
    case UserBlogsActionTypes.BLOGS_FETCH_START:
      return {
        ...state,
        blogs: initialBlogState.blogs
      }

    case UserBlogsActionTypes.BLOGS_FETCH_COMPLETE:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          ...action.payload,
          isLoaded: true,
        }
      };

    case UserBlogsActionTypes.BLOGS_ADD_COMPLETE:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          items: [...state.blogs.items, action.payload.data],
          count: state.blogs.count + 1
        }
      };

    case UserBlogsActionTypes.BLOGS_EDIT_COMPLETE: {
      const index = state.blogs.items.findIndex(x => x._id == action.payload.data._id);
      let items = [...state.blogs.items];
      items[index] = { ...action.payload.data };
      return {
        ...state,
        blogs: {
          ...state.blogs,
          items: [...items],
        }
      };
    }


    case UserBlogsActionTypes.BLOG_DETIAL_COMPLETE:
      return {
        ...state,
        blog_detail: {
          ...state.blog_detail,
          blog: {
            ...action.payload,
          },
          slug: action.payload.slug
        }
      };

    case UserBlogsActionTypes.BLOG_DELETE_COMPLETE: {
      return {
        ...state,
        blogs: {
          ...state.blogs,
          items: [...state.blogs.items.filter(x => x.slug != action.slug)]
        }
      };
    }

    default:
      return state;
  }
}