import {Component, Inject, OnDestroy, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {CostService} from "../costs/cost.service"
import {Subscription} from "rxjs"

@Component({
  selector: 'app-delete-dealog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  sub: Subscription
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef:MatDialogRef<DeleteDialogComponent>,
               private costService: CostService) { }

  ngOnInit(): void {
  }

  delete() {
    console.log(this.data)
    const {cost} = this.data
    this.sub = this.costService.delete(this.data.cost._id).subscribe((message) => {
      this.dialogRef.close({id:this.data.cost._id, message: `Cost: ${cost.name} deleted `})
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
