import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, exhaustMap, map, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserData } from '../ngrx-manage/app/app.selector';
import { HttpErrorHandle } from '../ngrx-manage/app/app.action';
import { AppToastrService } from './toastr.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private store: Store,
        private toastr: AppToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return this.store.select(getUserData).pipe(take(1),
            exhaustMap(data => {
                let authReq: any = null;
                let headers = new HttpHeaders();
                if (data && data.token) {
                    const authHeader = 'bearer ' + data.token;
                    headers = headers.set('Authorization', authHeader);
                }
                authReq = req.clone({ headers });
                return next.handle(authReq).pipe(
                    map(event => {
                        if (event instanceof HttpResponse) {
                            if (req.method != 'GET') {
                                this.toastr.showSuccessMessage(event.body.message);
                            }
                        }
                        return event
                    })
                );
            }),
            catchError(error => {
                this.store.dispatch(new HttpErrorHandle(error));
                return of()
            })
        );
    }
}
