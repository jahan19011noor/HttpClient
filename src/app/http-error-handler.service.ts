import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'

/**
 * Type of the handleError function returned by
 * HttpErrorHandler.createHandleError
 * 
 * Explanaton: As I understand it
 * the HandleError function is an Observable of type <T>
 * It will except to optional parameters
 *    operation of type string, result of type T
 * And it will pass its returned error to HttpErrorResponse function
 * Which in turn will return an observable of type T
 * **/
export type HandleError = <T>(operation?: string, result?: T) => 
                          (error: HttpErrorResponse) => 
                          Observable<T>;

// Handles HttpClient errors

@Injectable()
export class HttpErrorHandlerService {
  constructor(private messageService: MessageService) { }

  /**
   * Create curried handleError funciton
   * that already knows the service name
   * 
   * Explanation: as I understand it
   * createHandleError receives the value returned from
   *    the function which is receiving "serviceName"
   *        as its argument
   * this function does not return the to createHandleError
   * its body is this: <T>(operation = 'operation', result = {} as T)
   * which means it creates an observable of type T to which
   *    it passes the parameters operationa and result
   * it passes its return to this.handleError function
   * the final result from the this.handleError function
   *    gets assiged to createHandleError function
   * **/
  createHandleError = (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures
   * This error handler lets the app continue to run
   *    as if no error occured
   * @param serviceName = name of the data service
   *    that attempted the operaton
   * @param operation = name of the operation that failed
   * @param result = optional value to return as the observable result
   * **/
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to the console instead

      const message = (error.error instanceof ErrorEvent) ?
                      error.error.message :
                      `server returned code ${error.status}
                       with body "${error.error}"`
      
      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${serviceName}: ${operation} 
                              failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of( result );
    }
  }
}
