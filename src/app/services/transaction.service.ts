import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Transactions } from '../models/transactions';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://expenseappapi-d5gkczacegebb2gr.centralindia-01.azurewebsites.net//api/Transactions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transactions[]>{
    return this.http.get<Transactions[]>(this.apiUrl+"/All");
  }
  getById(id: number): Observable<Transactions>{
    return this.http.get<Transactions>(this.apiUrl+"/Details/"+id);
  } 
  create(transaction: Transactions): Observable<Transactions>{
    return this.http.post<Transactions>(this.apiUrl+"/Create", transaction);
  }
  update(id: number, transaction: Transactions): Observable<Transactions>{
    return this.http.put<Transactions>(this.apiUrl+"/Update/"+id, transaction);
  }
  delete(id:number): Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/Delete/"+id);
  }
}
