import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Group {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  baseUrl = 'http://localhost:8081/group/';

  constructor(private httpClient: HttpClient) {}

  getGroupById(id: string) {
    return this.httpClient.get<Group>(`${this.baseUrl}${id}`);
  }

  insertGroup(group: Group) {
    return this.httpClient.post<Group>(this.baseUrl, group);
  }

  updateGroup(group: Partial<Group>) {
    return this.httpClient.patch<Group>(`${this.baseUrl}${group.id}`, group);
  }

  deleteGroup(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
