import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RegisterInfos {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl = 'http://localhost:8081/auth/register';

  constructor(private httpClient: HttpClient) {}

  register(data: RegisterInfos) {
    return this.httpClient.post<RegisterInfos>(this.baseUrl, data);
  }
}
