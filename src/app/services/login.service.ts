import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface loginInfos {
  email: string;
  password: string;
}

export interface accessToken {
  accessToken: string;
  expires: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8081/auth/login';

  constructor(private httpClient: HttpClient) {}

  login(data: loginInfos) {
    return this.httpClient.post<accessToken>(this.baseUrl, data);
  }
}
