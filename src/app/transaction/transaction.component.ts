import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Transaction from '../../models/Transaction';
import TransactionService from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})

export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  transaction: Transaction;
  dataSource;

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({ description: '', type: '', amount: '' });
    this.getTransaction();
  }
  displayedColumns: string[] = ['date', 'description', 'amount', 'deleteButton'];

  getTransaction() {
    this.transactionService.getTransactions().subscribe((transactionList) => {
      this.dataSource = transactionList;
    });
  }
  transactionTypes = [{ label: 'Type1', id: 1 }, { label: 'Type2', id: 2 }];

  saveTransaction() {
    var values = this.transactionForm.value;
    this.transaction = new Transaction(values.type, values.description, values.amount);
    this.transaction.date = new Date();
    this.transactionService.saveTransaction(this.transaction).subscribe(transaction => {
      this.dataSource.push(transaction);
      this.dataSource = [...this.dataSource];
    });
  }

  deleteTransaction(transactionId) {
    if (confirm('Delete transaction?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(response => {
        if (response.status === 200) {
          alert('Transaction deleted');
        }
        else {
          alert("Something went wrong please try again!")
        }
      });
    }
  }
}
