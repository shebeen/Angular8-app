import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import Transaction from '../../models/Transaction';
const httpOptions:{ headers; observe; } = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth-token'
  }),
  observe: 'response'
}
@Injectable({
    providedIn: 'root'
})
export default class TransactionService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080/transaction';

  getTransactions() {
    return this
            .http
            .get(`${this.url}/all`);
  }

  saveTransaction(transaction:Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(`${this.url}/create`, transaction, httpOptions).pipe(
              tap((newTransaction: Transaction) => console.log(`added transaction w/ id=${newTransaction.id}`)),
              catchError(this.handleError<Transaction>('Add new transaction')));
  }

  deleteTransaction(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`,httpOptions).pipe(tap((response)=>console.log(response)),
    catchError(this.handleError("Delete transaction")));
  }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}