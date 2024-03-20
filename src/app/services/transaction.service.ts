import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface SerializedTransaction {
  id?: string;
  date: string;
  title: string;
  amount: number;
  account?: { id: string };
  budget?: { id: string } | null;
  isRefill: boolean;
}

export interface Transaction {
  id?: string;
  date: Date;
  title: string;
  amount: number;
  account?: { id: string };
  budget?: { id: string } | null;
  isRefill: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  baseUrl = 'http://localhost:8081/transaction/';

  constructor(private httpClient: HttpClient) {}

  getTransactionById(id: string): Observable<Transaction[]> {
    return this.httpClient
      .get<SerializedTransaction[]>(`${this.baseUrl}${id}`)
      .pipe(
        map((t) => {
          return t.map((t) => ({
            ...t,
            date: new Date(t.date),
          }));
        })
      );
  }

  getTransactionByBudgetId(budgetId: string): Observable<Transaction[]> {
    return this.httpClient
      .get<SerializedTransaction[]>(`${this.baseUrl}budget/${budgetId}`)
      .pipe(
        map((t) => {
          return t.map((t) => ({
            ...t,
            date: new Date(t.date),
          }));
        })
      );
  }

  getTransactionByAccountId(accountId: string): Observable<Transaction[]> {
    return this.httpClient
      .get<SerializedTransaction[]>(`${this.baseUrl}account/${accountId}`)
      .pipe(
        map((t) => {
          return t.map((t) => ({
            ...t,
            date: new Date(t.date),
          }));
        })
      );
  }

  insertTransaction(transaction: SerializedTransaction) {
    return this.httpClient.post<SerializedTransaction>(
      this.baseUrl,
      transaction
    );
  }

  update(id: string, transaction: Partial<SerializedTransaction>) {
    return this.httpClient.patch<SerializedTransaction>(
      `${this.baseUrl}${id}`,
      transaction
    );
  }

  deleteTransaction(id: string) {
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }
}
