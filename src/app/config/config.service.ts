import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Config } from './config';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {

  // change this url to see errors
  configUrl = "assets/config.json";

  constructor(private httpClient: HttpClient) { }

  //--- getConfig Version 1
  //--- before "Config" interface
  getConfig_1() {
    //fetch the data
    return this.httpClient.get(this.configUrl)
  }
  //--- getConfig Version 1

  //--- getConfig Version 2
  //--- after "Config" interface
  getConfig_2() {
    return this.httpClient.get<Config>(this.configUrl)
  }
  //--- getConfig Version 2

  //--- getConfig Version 3
  //--- with error handler and catchError()
  //--- after adding error path to showConfig_3() function in component
  getConfig_3() {
    return this.httpClient.get<Config>(this.configUrl)
            .pipe(
              catchError(this.handleError)
            )
  }
  //--- getConfig Version 3

  //--- getConfig Version 4
  //--- with retry()
  getConfig_4() {
    return this.httpClient.get<Config>(this.configUrl)
            .pipe(
              retry(3), // retry a failed request up to 3 times
              catchError(this.handleError)  // then handle the error
            )
  }
  //--- getConfig Version 4

  //--- reading the full response with observer option
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.httpClient.get<Config>(this.configUrl, { observe: 'response' })
  }
  //--- reading the full response with observer option

  //--- error handler function
  //-- it returns the RxJS ErrorObservable called "HttpErrorResponse"
      //-- with a user friendly error message
  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      // A client-side or network error occured.
      console.error('An error occured: ', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, `+
        `body was: ${error.error}`
      )
      
      // return an observable with a user-facting error message
      return throwError(
        'Something bad happened; please try again later.'
      );
    }
  }
  //--- error handler function
}
