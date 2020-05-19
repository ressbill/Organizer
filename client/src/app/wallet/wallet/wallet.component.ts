import {Component, OnDestroy, OnInit} from '@angular/core'
import {Cost, Income} from "../../../shared/interfaces"
import {MatDialog} from "@angular/material/dialog"
import {DialogAddIncomeComponent} from "../dialog-add-income/dialog-add-income.component"
import {IncomeService} from "../income/income.service"
import {DialogAddCostComponent} from "../costs/dialog-add-cost/dialog-add-cost.component"
import {forkJoin, Subscription} from "rxjs"
import {CostService} from "../costs/cost.service"
import {MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  monthCosts = 2400
  monthIncome = 2400
  costs: Cost [] = []
  fetchSub: Subscription
  income: Income[] = []
  isLoading = true

  constructor(private _snackBar: MatSnackBar,private dialog: MatDialog, private incomeService: IncomeService, private costService: CostService) {
  }

  ngOnInit(): void {
    const wallet = forkJoin([this.incomeService.fetch(), this.costService.fetch()])
    this.fetchSub = wallet.subscribe(response => {
      this.isLoading = false
      const fetchedCosts = response[1]
      const fetchedIncome = response[0]
      this.costs = fetchedCosts
      this.income = fetchedIncome
      this.monthIncome = this.income.reduce((acc,income) => {
        return acc+=income.amount
      },0)
      this.monthCosts = this.costs.reduce((acc,cost) => {
        return acc+=cost.price
      },0)
    })

    // this.incomeService.fetch().subscribe((income) => {
    //   this.isLoading = false
    //   console.log(income)
    //   if (income.length > 0) {
    //     this.income = income
    //   }
    //
    // })
  }

  addIncome() {
    let incomeDialog = this.dialog.open(DialogAddIncomeComponent, {
      minHeight: '300',
      minWidth: '500',

    })
    incomeDialog.afterClosed().subscribe(result => {
      if (result) {
        this.income.unshift(result)
        this.monthIncome += result.amount
        this._snackBar.open('Income added', 'Ok!', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    })
  }

  addCost() {
    let costDialog = this.dialog.open(DialogAddCostComponent, {
      minHeight: '300',
      minWidth: '500',

    })
    costDialog.afterClosed().subscribe(result => {
      if (result) {
        this.costs.unshift(result)
        this.monthCosts += result.price
        this._snackBar.open('Cost added', 'Ok!', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    })
  }

  ngOnDestroy(): void {
  }

}
