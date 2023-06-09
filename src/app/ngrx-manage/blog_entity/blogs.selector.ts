import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBlogs, blogEntityAdapter } from "./bogs.state";
import { getCurrentRoute } from "../router/router.selector";
import { RouterStateUrl } from "../router/custom-serializer";

export const BLOG_ENTITY_STATE_NAME = 'blog_entity';

export const getUserBlogEnitityState = createFeatureSelector<IBlogs>(BLOG_ENTITY_STATE_NAME);

const { selectAll } = blogEntityAdapter.getSelectors();

export const getUserBlogsEnitityData = createSelector(
  getUserBlogEnitityState, selectAll
);

export const getUserBlogsEnitityLoadedState = createSelector(
  getUserBlogEnitityState, (state => state.isLoaded)
);

export const getUserBlogDetailEnitityState = createSelector(
  getUserBlogEnitityState, (state => state.blog)
);

export const getUserBlogDetailSlugEnitityState = createSelector(
  getUserBlogEnitityState,
  getCurrentRoute,
  (state, route: RouterStateUrl) => {
    const slug = route.params['slug'];
    if (slug) {
      if (state && !state.slug) return { slug, slugChange: true }
      if (state && state.slug && state.blog?.slug != slug) {
        return { slug, slugChange: true };
      }
    }
    return { slug, slugChange: false }
  }
);