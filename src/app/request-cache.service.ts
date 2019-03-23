import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';
import { MessageService } from './message.service';
import { last } from 'rxjs/operators';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

// INTERFACE CALLED RequestCacheEntry
export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}
// INTERFACE CALLED RequestCacheEntry

// ABSTRUCT CLASS CALLED RequestCache
export abstract class RequestCache {
  abstract get(req: HttpRequest<any>) : HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>) : void;
}
// ABSTRUCT CLASS CALLED RequestCache

const maxAge = 30000; // maximum cache age (ms)

@Injectable()
export class RequestCacheWithMapService implements RequestCache {
  
  cache = new Map<string, RequestCacheEntry>();

  constructor(private messageService: MessageService) { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if(!cached)
    {
      return undefined
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired' : '';
    this.messageService.add(
      `Found ${expired} cached response for "${url}".`
    )
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>) : void {
    const url = req.urlWithParams;
    this.messageService.add(`Caching response from "${url}"`);

    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if(entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    })

    this.messageService.add(`Request cache size: ${this.cache.size}.`)
  }
}
