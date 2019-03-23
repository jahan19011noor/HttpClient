/**
 * do-nothing noop interceptor
 * simply passes the request through
 * without touching it
 */

 import { Injectable } from '@angular/core'
 import {
     HttpEvent,
     HttpInterceptor,
     HttpHandler,
     HttpRequest
 } from '@angular/common/http';
 import { Observable } from 'rxjs'

//  Pass untouched request through to the next request handler
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): 
            /**
             * The intercept method transforms a request into an Observable
             * that eventually returns the Http response
             * In this sense, each interceptor is fully capable 
             *      handling the request entirely by itself
             */
            Observable<HttpEvent<any>> {
                /**
                 * Interceptor inspect and/or alters the request
                 * and forwared the request to the handle() method
                 * of the next object
                 *      which implements the HttpHandler interface
                 * THE HTTPHANDLER INTERFACE
                    export abstract class HttpHandler {
                        abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
                    }
                 * Like intercept(), the handle() method transforms an HTTP request
                 * into an Observable of HttpEvents which ultimately include the server's response.
                 * The intercept() method could inspect that observable and alter it
                 * before returning it to the caller.
                 */
                return next.handle(req)

                /**
                 * The next object represents the next interceptor
                 *      in the chain of interceptors.
                 * The final next in the chain is the HttpClient backend handler
                 *      that sends the request to the server and receives the server's response.
                 */

                 /**
                  * VERY IMPORTANT POINT
                  * Most interceptors call next.handle() so that
                  *     the request flows through to the next interceptor and,
                  *     eventually, the backend handler.
                  * An interceptor could skip calling next.handle(),
                  *     short-circuit the chain,
                  *     and return its own Observable
                  *     with an artificial server response.
                  * This is a common middleware pattern found in frameworks such as Express.js.
                  */
            }
}