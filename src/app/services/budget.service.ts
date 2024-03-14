import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Budget {
  id: string;
  title: string;
  description: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  baseUrl = 'http://localhost:8081/budget/';

  constructor(private httpClient: HttpClient) { }

  getBudgetById(id: string) {
    return this.httpClient.get<Budget[]>(`${this.baseUrl}${id}`);
  }

  insertBudget(budget: Budget) {
    return this.httpClient.post<Budget>(this.baseUrl, budget);
  }

  updateBudget(id: string, budget: Partial<Budget>) {
    return this.httpClient.patch<Budget>(`${this.baseUrl}${id}`, budget);
  }

  deleteBudget(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
