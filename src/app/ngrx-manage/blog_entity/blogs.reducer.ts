import { createReducer, on } from '@ngrx/store';
import { BlogAddAction, BlogAddCompleteAction, BlogDeleteAction, BlogDeleteCompleteAction, BlogDetailCompleteAction, BlogEditCompleteAction, BlogsFetchAction, BlogsFetchCompleteAction } from './blogs.action';
import { blogEntityAdapter, initialBlogDetailEntityState, initialBlogEntityState } from './bogs.state';


const BlogReducer = createReducer(
  initialBlogEntityState,
  on(BlogsFetchCompleteAction, (state, action) => {
    return blogEntityAdapter.setAll(action.payload.items, { ...state, ...action.payload, isLoaded: true });
  }),

  on(BlogAddCompleteAction, (state, { payload }) => blogEntityAdapter.addOne(payload.data, state)),

  on(BlogDetailCompleteAction, (state, { payload }) => blogEntityAdapter.setOne(payload, { ...state, blog: payload, slug: payload.slug })),

  on(BlogEditCompleteAction, (state, { payload }) => blogEntityAdapter.updateOne({ id: payload.data._id, changes: payload.data }, state)),

  on(BlogDeleteCompleteAction, (state, { slug }) => {
    const blog = Object.values(state.entities).find((item) => item?.slug === slug);
    const id = blog?._id as string;
    return blogEntityAdapter.removeOne(id, state)
  }),
);

export function BlogEntityReducer(state: any, action: any) {
  return BlogReducer(state, action);
}