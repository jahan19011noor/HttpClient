/** "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http'


import { NoopInterceptor } from './noop-interceptor'
import { EnsureHttpInterceptor } from './ensure-https-interceptor';
import { TrimNameInterceptor } from './trim-name-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { UploadInterceptor } from './upload-interceptor';
import { CachingInterceptor } from './caching-interceptor';

/** ---------- NOTE ---------
 * Angular applies interceptors in the order
 * that you provide them.
 * If you provide interceptors A, then B, then C,
 * requests will flow in A->B->C and responses will
 * flow out C->B->A.
 * You cannot change the order or remove interceptors later.
 * If you need to enable and disable an interceptor dynamically,
 * you'll have to build that capability into the interceptor itself.
 * 
 * YOUR INTERCEPTOR SHOUDL RETURN EVERY EVENT UNTOUCHED
 * UNLESS IT HAS A COMPILLING REASON TO OTHERWISE
 */

/** Http interceptor providers in oursitde-in (top-bottom) order */
export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: NoopInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: EnsureHttpInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TrimNameInterceptor,
        multi: true
    },
    /** Auth Interceptor creating problems in
     * the request and response system
     */
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptor,
    //     multi: true
    // },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoggingInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UploadInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CachingInterceptor,
        multi: true
    }
]