import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Account {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:8081/account/';

  constructor(private httpClient: HttpClient) { }

  getAccountById(id: string) {
    return this.httpClient.get<Account>(`${this.baseUrl}${id}`);
  }

  insertAccount(account: Account) {
    return this.httpClient.post<Account>(this.baseUrl, account);
  }

  updateAccount(account: Partial<Account>) {
    return this.httpClient.patch<Account>(`${this.baseUrl}${account.id}`, account);
  }

  deleteAccount(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
