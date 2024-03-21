import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

const token = {};
export interface SerializedTransaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  account: { id: string };
  budget: { id: string } | null;
  isRefill: boolean;
}

export interface Transaction {
  id: string;
  date: Date;
  title: string;
  amount: number;
  account: { id: string };
  budget: { id: string } | null;
  isRefill: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  baseUrl = 'http://localhost:8081/transaction/';

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

  getTransactionById(id: string): Observable<Transaction[]> {
    const token = this.setupHeaderAuthorize();

    return this.httpClient
      .get<SerializedTransaction[]>(`${this.baseUrl}${id}`, token)
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
    const token = this.setupHeaderAuthorize();

    return this.httpClient
      .get<SerializedTransaction[]>(`${this.baseUrl}budget/${budgetId}`, token)
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
    const token = this.setupHeaderAuthorize();

    return this.httpClient
      .get<SerializedTransaction[]>(
        `${this.baseUrl}account/${accountId}`,
        token
      )
      .pipe(
        map((t) => {
          return t.map((t) => ({
            ...t,
            date: new Date(t.date),
          }));
        })
      );
  }

  insertTransaction(transaction: Partial<SerializedTransaction>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.post<SerializedTransaction>(
      this.baseUrl,
      transaction,
      token
    );
  }

  update(transaction: Partial<SerializedTransaction>) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.patch<SerializedTransaction>(
      `${this.baseUrl}${transaction.id}`,
      transaction,
      token
    );
  }

  deleteTransaction(id: string) {
    const token = this.setupHeaderAuthorize();

    return this.httpClient.delete(`${this.baseUrl}${id}`, token);
  }
}
