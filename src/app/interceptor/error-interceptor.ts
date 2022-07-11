import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserServiceService } from "../services/user-service.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserServiceService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            return throwError(err);
        }))
    }
}
