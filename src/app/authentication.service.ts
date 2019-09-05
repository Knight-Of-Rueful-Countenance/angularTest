import { Injectable } from '@angular/core';
import { Credentials, Tokens } from './Interfaces';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uri = 'http://localhost:4000/api/auth';
  token: Tokens;
  constructor(private http: HttpClient) { }

  async authenticate(username, password) {
    const obj = {username, password};
    console.log('do the thing');
    await this.http.post(`${this.uri}/login`, obj).subscribe(async (res: Response) => {
      const body = await res.json();
      if (body.message === 'OK') {
        // token has probably been provided.
        this.token.access_key = body.access_key;
        this.token.expiry = body.expiry;
      } else {

      }
    });

  }
  async newAccount(username, password) {
    const obj = {username, password};
    console.log('do the thing2');
    await this.http.post(`${this.uri}/new`, obj).subscribe(async (res: Response) => {
      const body = await res.json();
      if (body.message === 'OK') {
        // token has probably been provided.
        this.token.access_key = body.access_key;
        this.token.expiry = body.expiry;
      } else {
       // Output body.message. Probably says that username is already taken.
      }
    });
  }
}
