import {Component, OnDestroy, OnInit} from '@angular/core'
import {Cost} from "../../../shared/interfaces"
import {CostService} from "./cost.service"
import {SubscriptionLike} from "rxjs"
import {MatDialog} from "@angular/material/dialog"
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component"
import {MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit, OnDestroy {
  isLoading = true
  costs: Cost[] = []
  subs: SubscriptionLike[] = []
  costForAnUpdate: Cost
  constructor(private costService: CostService, private dialog: MatDialog, private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.costService.fetch().subscribe(response => {
        this.isLoading = false
        this.costs = response
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  saveCost($event: Cost) {
    this.costs.unshift($event)
    this.snackBar.open( ' Cost created' ,'Ok!')
  }

  onDelete(cost:Cost) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        question: 'Delete cost: ',
        cost: cost
      }
    })
    dialogRef.afterClosed().subscribe(answer => {
      if(answer){
        this.snackBar.open(answer.message + ' successfully!' ,'Ok!')
        const idx = this.costs.findIndex(c=> c._id === answer.id)
        this.costs.splice(idx,1)
      }

      // if (answer === 'yes') {
      //   //
      //   console.log('delete')
      // }
    })
  }

  onEdit(cost: Cost) {
    this.costForAnUpdate = cost
  }

  updateCost($event: Cost) {
    const idx = this.costs.findIndex(c => c._id === $event._id)
    this.costs[idx] = $event
    this.snackBar.open( ' Cost updated successfully' ,'Ok!')

  }
}
