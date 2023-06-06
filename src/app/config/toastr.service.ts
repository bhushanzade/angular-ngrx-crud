import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ApplicationState } from '../ngrx-manage/app/app.state';
import { getHttpError } from '../ngrx-manage/app/app.selector';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';

type ToastrType = 'success' | 'error' | 'warning' | 'information';

@Injectable({
  "providedIn": 'root'
})
export class AppToastrService {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private store: Store<ApplicationState>
  ) {
    this.store.select(getHttpError).subscribe(error => {
      this.handleErrors(error);
    })
  }

  showSuccessMessage(message: string) {
    this.toastr.success(message, '')
  }

  handleErrors(error: HttpErrorResponse) {
    if (error) {
      let msg = '';
      switch (error.status) {
        case 0:
          {
            if (error.error == null)
              msg = 'The request you send to server is in bad fromat';
            else
              msg = error.message;

            var title = '';
            this.toastr.error(msg, title);
            break;
          }

        case 302:
          msg = error.error.message;
          var title = 'Found';
          this.toastr.error(msg, title);
          break;

        case 400:
          {
            if (error.error == null)
              msg = 'The request you send to server is in bad fromat';

            if (error.error.message)
              msg = error.error.message;

            var title = 'Error';
            this.toastr.error(msg, title);
            break;
          }

        case 401:
          {
            const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: snapshot.url } });
            msg = 'Token expired';
            if (error.error.message)
              msg = error.error.message;
            var title = '';
            this.toastr.error(msg, title);
            break;
          }

        case 403:
          {
            if (error.error.status) {
              msg = error.error.status;
            } else {
              msg = 'This resource is not accessible for you';
            }
            const title = error.statusText;
            this.toastr.error(msg, title);
            break;
          }

        case 404:
          {
            if (error.error == null || error.error.type === 'application/json')
              msg = 'Looks like we couldn’t find document.';
            else {
              msg = error.error.message;
            }
            var title = 'Not Found';
            this.toastr.error(msg, title);
            if (error.error.isRedirect === true)
              this.router.navigate(['/404']);
            break;
          }

        case 405:
          {
            if (error.error == null || !error.error.message)
              msg = 'Method Not Allowed';
            else {
              msg = error.error.message;
            }

            var title = '';
            this.toastr.error(msg, title);
            break;
          }

        case 406:
          this.objectKeyValueToast(error.error);
          break;
        case 409:
          {
            if (error.error.message == null) {
              msg = 'Oops! Something went wrong. Please try again after some time.';
            }
            else {
              msg = error.error.message;
            }

            var title = '';
            this.toastr.error(msg, title);
            break;
          }

        case 412:
          {
            if (error.error.message == null) {
              msg = 'Oops! Something went wrong. </br>Please try again after some time.';
            }
            else {
              msg = error.error.message;
            }

            var title = 'Update Failed';
            this.toastr.error(msg, title);
            break;
          }

        case 422:
          this.objectKeyValueToast(error.error);
          break;
        case 429:
          {
            var title = '';
            if (error.error.type === 'application/json') {
              msg = 'The file is empty.';
              this.toastr.error(msg, title);
              break;
            }

            for (var property in error.error) {
              title = 'Request Warning';
              this.toastr.warning(error.error[property], title);
            }
            break;
          }
        case 500:
          {
            if (error.error.message == null) {
              msg = 'Oops! Something went wrong. Please try again after some time.';
            }
            else {
              msg = error.error.message;
            }

            var title = '';
            this.toastr.error(msg, title);
            break;
          }

        default:
          {

          }
      }

    }

  }

  objectKeyValueToast(obj: any): void {
    for (var property in obj) {
      this.toastr.error(obj[property], property);
    }
  }

}