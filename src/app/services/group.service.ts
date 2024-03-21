import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface Group {
  id?: string;
  name: string;
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
export class GroupService {
  baseUrl = 'http://localhost:8081/group/';

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

  getGroupById(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<Group>(`${this.baseUrl}${id}`, token);
  }

  insertGroup(group: Group) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.post<Group>(this.baseUrl, group, token);
  }

  updateGroup(group: Partial<Group>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.patch<Group>(
      `${this.baseUrl}${group.id}`,
      group,
      token
    );
  }

  deleteGroup(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.delete(`${this.baseUrl}${id}`, token);
  }
}
