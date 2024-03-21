import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface Budget {
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
export class BudgetService {
  baseUrl = 'http://localhost:8081/budget/';

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

  getBudgetById(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.get<Budget[]>(`${this.baseUrl}${id}`, token);
  }

  insertBudget(budget: Budget) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.post<Budget>(this.baseUrl, budget, token);
  }

  updateBudget(budget: Partial<Budget>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.patch<Budget>(
      `${this.baseUrl}${budget.id}`,
      budget,
      token
    );
  }

  deleteBudget(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.delete(`${this.baseUrl}${id}`, token);
  }
}
