import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit{


transactionForm: FormGroup;
incomeCategories = [
  'Salary',
  'Freelance',
  'Investment'
];
expenseCategories = [
  'Food',
  'Transportation',
  'Entertainment'
];

availableCategories: string[] = [];
editMode = false;
transactionId?: number;

constructor(private fb: FormBuilder, private router: Router, 
  private transactionService: TransactionService,
private activateRoute: ActivatedRoute) {
  this.transactionForm = this.fb.group({
    type: ['Expense', Validators.required],
    category: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]]
  });
}
  ngOnInit(): void {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailablecategories(type);
    const id = this.activateRoute.snapshot.paramMap.get("id");
    if(id)
    {
      this.editMode =true;
      this.transactionId = +id;

      this.loadTransaction(this.transactionId);
    }
  }
loadTransaction(id: number): void{
  this.transactionService.getById(id).subscribe(
    {
      next: (transaction)=>{
         this.updateAvailablecategories(transaction.type);
        this.transactionForm.patchValue(
          {
            type: transaction.type,
            category: transaction.category,
            amount: transaction.amount
          }
        )
       
      },
      error:(error)=> {
        console.log('Error - ', error);
      }
    }
  )
}
  onSubmit() {
if(this.transactionForm.valid){
  const transaction = this.transactionForm.value;
if(this.editMode && this.transactionId)
{
  this.transactionService.update(this.transactionId, transaction)
  .subscribe(
    {
      next: ()=>{
        this.router.navigate(['/transactions']);
      },
      error:(error)=> {
        console.log('Error - ', error);
      }
    }
  );
}
else{
 
  this.transactionService.create(transaction)
  .subscribe(
    {
      next: ()=>{
        this.router.navigate(['/transactions']);
      },
      error:(error)=> {
        console.log('Error - ', error);
      }
    }
  );
}
}
}
onTypeChange() {
 const type = this.transactionForm.get('type')?.value;
    this.updateAvailablecategories(type);
    
}

updateAvailablecategories(type: string)
{
  
this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
this.transactionForm.patchValue({category: ''});
}
cancel() {
  this.router.navigate(['/transactions']);
}
}
