import {Component, Inject, OnInit} from '@angular/core'
import {Subscription} from "rxjs"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {CostService} from "../costs/cost.service"
import {IncomeService} from "../income/income.service"

@Component({
  selector: 'app-delete-dialog-income',
  templateUrl: './delete-dialog-income.component.html',
  styleUrls: ['./delete-dialog-income.component.scss']
})
export class DeleteDialogIncomeComponent implements OnInit {
  sub: Subscription
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef:MatDialogRef<DeleteDialogIncomeComponent>,
               private incomeService: IncomeService) { }

  ngOnInit(): void {
  }

  delete() {
    console.log(this.data)
    const {cost} = this.data
    this.sub = this.incomeService.delete(this.data.cost._id).subscribe((message) => {
      this.dialogRef.close({id:this.data.cost._id, message: `Income: ${cost.name} deleted `})
    })

  }

  cancel() {
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
}
