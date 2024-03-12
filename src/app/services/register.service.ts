import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RegisterInfos {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl = 'http://localhost:8081/auth/register';

  constructor(private httpClient: HttpClient) {}

  private verifyPasswordAreSame(data: RegisterInfos) {
    if (data.password != data.passwordConfirm) {
      return false;
    }
    return true;
  }

  register(data: RegisterInfos) {
    if (this.verifyPasswordAreSame(data)) {
      return this.httpClient.post<RegisterInfos>(this.baseUrl, data);
    }
    return null;
  }
}
