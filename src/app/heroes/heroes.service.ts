import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hero } from './hero';
import { HandleError, HttpErrorHandlerService } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable()
export class HeroesService {

  heroesUrl = 'api/heroes'; // URL to web api
  private handleError: HandleError;
  
  constructor(private httpClient: HttpClient,
              private httpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = this.httpErrorHandlerService
                        .createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
                .pipe(
                  catchError(this.handleError('getHeroes', []))
                )
  }
  
  /** POST: add a new hero to the database */
  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions)
                .pipe(
                  catchError(this.handleError('addHero', hero))
                )
  }

  /** PUT: update the hero on the server.
   * Returns the updated hero upon success
   */
  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(this.heroesUrl, hero, httpOptions)
                .pipe(
                  catchError(this.handleError('updateHero', hero))
                )
  }

  /** DELETE: delete teh hero from the server */
  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete(url, httpOptions)
                .pipe(
                  catchError(this.handleError('deleteHero'))
                )
  }

  /** GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim()

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('name', term) } : {}

    return this.httpClient.get<Hero[]>(this.heroesUrl, options)
                .pipe(
                  catchError(this.handleError<Hero[]>('searchHeroes', []))
                )
  }
}
