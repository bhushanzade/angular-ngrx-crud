import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from './config/auth.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: 'data-blogs',
        loadChildren: () => import('./pages/data-blogs/data-blogs.module').then(m => m.DataBlogsModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
