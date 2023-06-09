import { createReducer, on } from '@ngrx/store';
import { BlogAddCompleteAction, BlogDeleteCompleteAction, BlogDetailCompleteAction, BlogEditCompleteAction, BlogsFetchAction, BlogsFetchCompleteAction } from './blogs.action';
import { initialBlogState } from './bogs.state';


export const BlogReducer = createReducer(
  initialBlogState,

  on(BlogsFetchAction, (state) => {
    return {
      ...state,
      blogs: initialBlogState.blogs
    }
  }),

  on(BlogsFetchCompleteAction, (state, { payload }) => {
    return {
      ...state,
      blogs: {
        ...state.blogs,
        ...payload,
        isLoaded: true,
      }
    };
  }),

  on(BlogDetailCompleteAction, (state, { payload }) => {
    return {
      ...state,
      blog_detail: {
        ...state.blog_detail,
        blog: {
          ...payload,
        },
        slug: payload.slug
      }
    };
  }),

  on(BlogEditCompleteAction, (state, { payload }) => {
    const index = state.blogs.items.findIndex(x => x._id == payload.data._id);
    let items = [...state.blogs.items];
    items[index] = { ...payload.data };
    return {
      ...state,
      blogs: {
        ...state.blogs,
        items: [...items],
      }
    };
  }),

  on(BlogAddCompleteAction, (state, { payload }) => {
    return {
      ...state,
      blogs: {
        ...state.blogs,
        items: [...state.blogs.items, payload.data],
        count: state.blogs.count + 1
      }
    };
  }),

  on(BlogDeleteCompleteAction, (state, { slug }) => {
    return {
      ...state,
      blogs: {
        ...state.blogs,
        items: [...state.blogs.items.filter(x => x.slug != slug)]
      }
    };
  })
);

// export function BlogReducer(state: IBlogSate = initialBlogState, action: UserBlogActions): IBlogSate {
//   switch (action.type) {
//     case UserBlogsActionTypes.BLOGS_ADD_COMPLETE:
//       return {
//         ...state,
//         blogs: {
//           ...state.blogs,
//           items: [...state.blogs.items, action.payload.data],
//           count: state.blogs.count + 1
//         }
//       };

//     case UserBlogsActionTypes.BLOGS_EDIT_COMPLETE: {
//       const index = state.blogs.items.findIndex(x => x._id == action.payload.data._id);
//       let items = [...state.blogs.items];
//       items[index] = { ...action.payload.data };
//       return {
//         ...state,
//         blogs: {
//           ...state.blogs,
//           items: [...items],
//         }
//       };
//     }


//     case UserBlogsActionTypes.BLOG_DETIAL_COMPLETE:
//       return {
//         ...state,
//         blog_detail: {
//           ...state.blog_detail,
//           blog: {
//             ...action.payload,
//           },
//           slug: action.payload.slug
//         }
//       };

//     case UserBlogsActionTypes.BLOG_DELETE_COMPLETE: {
//       return {
//         ...state,
//         blogs: {
//           ...state.blogs,
//           items: [...state.blogs.items.filter(x => x.slug != action.slug)]
//         }
//       };
//     }

//     default:
//       return state;
//   }
// }