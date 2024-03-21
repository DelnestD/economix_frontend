import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from './group.service';
import { Account } from './account.service';
import { Budget } from './budget.service';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: Role;
  group?: Group;
  accounts?: Account[];
  budgets?: Budget[];
}

export enum Role {
  LEADER = 'leader',
  MEMBER = 'member',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8081/user/';

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

  getUserById(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<User>(`${this.baseUrl}${id}`, token);
  }

  getUserByEmail(email: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<User>(`${this.baseUrl}email/${email}`, token);
  }

  getUsersByGroupId(groupId: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<User[]>(
      `${this.baseUrl}group/${groupId}`,
      token
    );
  }

  getUserAccounts(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<Account[]>(
      `${this.baseUrl}account/${id}`,
      token
    );
  }

  getUserBudgets(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<Budget[]>(`${this.baseUrl}budget/${id}`, token);
  }

  insertUser(user: User) {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  updateUser(user: Partial<User>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.patch<User>(
      `${this.baseUrl}${user.id}`,
      user,
      token
    );
  }

  deleteUser(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.delete(`${this.baseUrl}${id}`, token);
  }
}
