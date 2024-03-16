import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface loginInfos {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8081/auth/login';

  constructor(private httpClient: HttpClient) {}

  login(data: loginInfos) {
    return this.httpClient.post<loginInfos>(this.baseUrl, data);
  }
}