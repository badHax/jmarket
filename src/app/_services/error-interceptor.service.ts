import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private _toast: ToastrService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
            let error = throwError("Server Error");
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                error = throwError("User Login failed");
            }
            let data = {};
            data = {
                reason: err && err.error && err.error.reason ? err.error.reason : '',
                status: err.status
            };
            //do something with data
            console.log(data);
            return error;
        }))
    }
}
