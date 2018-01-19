import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent}                      from '@angular/common/http';
import { Injectable, Inject }       from '@angular/core';
import { LoaderService }            from '@r-service/loader.service';

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loader: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.onStarted(request);
        return next
            .handle(request)
            .finally(() => this.loader.onFinished(request));
    }
}
