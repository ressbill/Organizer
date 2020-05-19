import {Component, OnDestroy, OnInit} from '@angular/core'
import {Income} from "../../../shared/interfaces"
import {SubscriptionLike} from "rxjs"
import {MatDialog} from "@angular/material/dialog"
import {MatSnackBar} from "@angular/material/snack-bar"
import {IncomeService} from "./income.service"
import {DeleteDialogIncomeComponent} from "../delete-dialog-income/delete-dialog-income.component"

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {
  isLoading = true
  income: Income[] = []
  subs: SubscriptionLike[] = []
  incomeForAnUpdate: Income

  constructor(private incomeService: IncomeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.incomeService.fetch().subscribe(response => {
        this.isLoading = false
        this.income = response
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  saveIncome($event: Income) {
    this.income.unshift($event)
    this.snackBar.open(' Income created', 'Ok!', {
      duration: 3000
    })
  }

  onDelete(income: Income) {
    let dialogRef = this.dialog.open(DeleteDialogIncomeComponent, {
      data: {
        question: 'Delete income: ',
        cost: income
      }
    })
    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.snackBar.open(answer.message + ' successfully!', 'Ok!',{
          duration: 3000
        })
        const idx = this.income.findIndex(c => c._id === answer.id)
        this.income.splice(idx, 1)
      }
    })
  }

  onEdit(income: Income) {
    this.incomeForAnUpdate = income
  }

  updateIncome($event: Income) {
    const idx = this.income.findIndex(c => c._id === $event._id)
    this.income[idx] = $event
    this.snackBar.open(' Income updated successfully', 'Ok!', {
      duration: 3000
    })

  }

}
