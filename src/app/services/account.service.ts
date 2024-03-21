import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface Account {
  id: string;
  title: string;
  description?: string;
}

let headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append(
  'Authorization',
  'Bearer ' + localStorage.getItem('accessToken')
);
const token = {
  headers: headers_object,
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:8081/account/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  private setupHeaderAuthorize() {
    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `${this.cookieService.get('accessToken')}`
      ),
    };
  }

  getAccountById(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<Account>(`${this.baseUrl}${id}`, token);
  }

  insertAccount(account: Account) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.post<Account>(this.baseUrl, account, token);
  }

  updateAccount(account: Partial<Account>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.patch<Account>(
      `${this.baseUrl}${account.id}`,
      account,
      token
    );
  }

  deleteAccount(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.delete(`${this.baseUrl}${id}`, token);
  }
}
