import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component';

// import { NoopInterceptor } from '@angular/common/http/src/interceptor';
import { httpInterceptorProviders } from './http-interceptors';
import { RequestCache, RequestCacheWithMapService } from './request-cache.service';

/** NOTE------------
 * Because interceptors are (optional) dependencies
 *    of the HttpClient service,
 * you must provide them in the same injector
 *    (or a parent of the injector)
 * that provides HttpClient.
 * Interceptors provided after
 *    DI creates the HttpClient are ignored.
 */

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /** To See Errors uncomment the following line */
    // InMemoryWebApiModule.forRoot(InMemoryDataServiceService)
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    )
  ],
  providers: [
    HttpErrorHandlerService,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMapService },
    // before createing "Barrel" file
    // [
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: NoopInterceptor,
    //     multi: true
    //   }
    // ]
    // after creating "Barrel" file
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
