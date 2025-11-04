import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/models/transactions';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit{

transactions: Transactions[] = [];

  constructor(private transactionService: TransactionService,
    private router: Router
  ) {
    
    
  }
  
  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void{
    this.transactionService.getAll()
    .subscribe((data)=> this.transactions = data);
  }

  getTotalIncome(): number{
    return this,this.transactions.filter(t=> t.type==='Income').reduce((sum, t)=> sum + t.amount, 0);
  }

  getTotalExpenses(): number{
    return this,this.transactions.filter(t=> t.type==='Expense').reduce((sum, t)=> sum + t.amount, 0);
  }

  getNetbalance(): number{
    return this.getTotalIncome()-this.getTotalExpenses();
  }

  editTransaction(transaction: Transactions) {
    if(transaction.id)
    {
      this.router.navigate(['/edit/', transaction.id])
    }
}

deleteTransaction(transaction: Transactions){
  if(transaction.id)
    {
      if(confirm("Are you sure you want to delete this transaction ?")){
        this.transactionService.delete(transaction.id)
        .subscribe(
          {
      next: ()=>{
        this.loadTransactions();
      },
      error:(error)=> {
        console.log('Error - ', error);
      }
    }
        );
      }
    }
}
}
