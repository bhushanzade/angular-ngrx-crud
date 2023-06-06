import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBlogSate } from "./bogs.state";
import { getCurrentRoute } from "../router/router.selector";
import { RouterStateUrl } from "../router/custom-serializer";

export const BLOG_STATE_NAME = 'blog';

export const getUserBlogState = createFeatureSelector<IBlogSate>(BLOG_STATE_NAME);

export const getUserBlogsData = createSelector(
  getUserBlogState,
  (state: IBlogSate) => state && state.blogs ? state.blogs : []
);

export const getUserBlogsLoadedState = createSelector(
  getUserBlogState,
  (state: IBlogSate) => state && state.blogs ? state.blogs.isLoaded : false
);

export const getUserBlogSlug = createSelector(
  getUserBlogState,
  getCurrentRoute,
  (state: IBlogSate, route: RouterStateUrl) => {
    const slug = route.params['slug'];
    if (slug) {
      if (state && !state.blog_detail.slug) return { slug, slugChange: true }
      if (state && state.blog_detail.slug && state.blog_detail.blog?.slug != slug) {
        return { slug, slugChange: true };
      }
    }
    return { slug, slugChange: false }
  }
);

export const getUserBlogData = createSelector(
  getUserBlogState,
  (state: IBlogSate) => state && state.blog_detail.blog
);