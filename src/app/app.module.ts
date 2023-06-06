import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Store, StoreModule } from '@ngrx/store';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppReducer } from './ngrx-manage/app/app.state';
import { AppToastrService } from './config/toastr.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './config/auth.guard';
import { UserDataAction } from './ngrx-manage/app/app.action';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { getLogoutStateData } from './ngrx-manage/logout/logout.selector';
import { Router } from '@angular/router';
import { AuthInterceptor } from './config/auth.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './ngrx-manage/router/custom-serializer';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxHttpLoaderModule.forRoot(),
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    AppToastrService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    toastr: AppToastrService,
    store: Store,
    router: Router
  ) {
    const app_data = localStorage.getItem("userdata");
    if (app_data) {
      store.dispatch(new UserDataAction(JSON.parse(app_data)));
    }

    store.select(getLogoutStateData).subscribe(data => {
      if (data && data.is_logout) {
        store.dispatch(new UserDataAction(null));
        localStorage.removeItem('userdata');
        if (data.is_login_redirect) {
          router.navigateByUrl('/auth/login');
        }
      }
    })

  }
}
