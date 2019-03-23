import { Injectable } from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  getAuthorizaitonToken() {
    return 'some-auth-token'
  }
}
