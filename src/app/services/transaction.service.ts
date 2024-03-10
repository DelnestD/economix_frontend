import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface Transaction {
  id: string;
  date: Date;
  title: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = 'http://localhost:3000/transaction/';

  constructor(private httpClient: HttpClient) { }

  getTransactionById(id: string) {
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}${id}`);
  }

  getTransactionByBudgetId(budgetId: string) {
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}${budgetId}`);
  }

  getTransactionByAccountId(accountId: string) {
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}${accountId}`);
  }

  insertTransaction(transaction: Transaction) {
    return this.httpClient.post<Transaction>(this.baseUrl, transaction);
  }

  update(id: string, transaction: Partial<Transaction>) {
    return this.httpClient.patch<Transaction>(`${this.baseUrl}${id}`, transaction);
  }

  deleteTransaction(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
