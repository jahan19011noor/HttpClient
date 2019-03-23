import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service
        const authToken = this.authService.getAuthorizaitonToken();

        /**
         * The verbose way:
         * 1. Clone the request
         * 2. Replace the original headers with cloned headers
         * 3. Update with authorization
         * const authReq = req.clone({
         *      headers: req.headers.set('Authorization', authToken)
         * })
         * 
         * One Step way:
         * 1. Clone the request and set the new header in one step
         */
         const authReq = req.clone({ setHeaders: {
             Authorization: authToken
         } })

         // send cloned request with header to the next handler
         return next.handle(authReq);
    }
}