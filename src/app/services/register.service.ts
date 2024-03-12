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

  private verifyPasswordAreSame(password: string, confirmPassword: string) {
    if (password != confirmPassword) {
      return false;
    }
    return true;
  }

  register(data: RegisterInfos, confirmPassword: string) {
    if (this.verifyPasswordAreSame(data.password, confirmPassword)) {
      return this.httpClient.post<RegisterInfos>(this.baseUrl, data);
    }
    return null;
  }
}
