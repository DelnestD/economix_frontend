import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}

export enum Role {
  LEADER = "leader",
  MEMBER = "member"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8081/user/';

  constructor(private httpClient: HttpClient) { }

  getUserById(id: string) {
    return this.httpClient.get<User>(`${this.baseUrl}${id}`);
  }

  getUserByEmail(email: string) {
    return this.httpClient.get<User>(`${this.baseUrl}email/${email}`);
  }

  getUserByGroupId(groupId: string) {
    return this.httpClient.get<User[]>(`${this.baseUrl}group/${groupId}`);
  }

  getUserAccounts(id: string) {
    return this.httpClient.get<User>(`${this.baseUrl}account/${id}`);
  }

  getUserBudgets(id: string) {
    return this.httpClient.get<User>(`${this.baseUrl}budget/${id}`);
  }

  insertUser(user: User) {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.httpClient.patch<User>(`${this.baseUrl}${id}`, user);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
