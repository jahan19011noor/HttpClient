import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpUserEvent, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * The readonly assignment guard
 *      can't prevent deep updates and, in particular,
 * it can't prevent you from modifying a property
 *      of a request body object.
 * 
 * req.body.name = req.body.name.trim(); // bad idea!
 * 
 * If you must mutate the request body,
 *      copy it first, change the copy, clone() the request,
 *      and set the clone's body with the new body,
 * as in the following example.
 */

 @Injectable()
 export class TrimNameInterceptor implements HttpInterceptor {
     intercept(req: HttpRequest<any>, next: HttpHandler) :
     Observable<HttpEvent<any>> {
        const body = req.body
        if(!body || !body.name) {
            return next.handle(req)
        }
        // copy the body and trim whitespace form the name property
        const newBody = { ...body, name: body.name.trim() }
        // clone reques tand set its body
        const newReq = req.clone({ body: newBody })
        // send the cloned request to the next handler
        return next.handle(newReq)
     }
 }