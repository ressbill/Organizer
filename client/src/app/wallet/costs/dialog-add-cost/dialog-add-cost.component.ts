import {AfterViewInit, Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {Cost} from "../../../../shared/interfaces"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {CostService} from "../cost.service"

@Component({
  selector: 'app-dialog-add-cost',
  templateUrl: './dialog-add-cost.component.html',
  styleUrls: ['./dialog-add-cost.component.scss']
})
export class DialogAddCostComponent implements OnInit, AfterViewInit {
  form: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public cost: Cost,
              private costService: CostService,
              public dialogCost: MatDialogRef<DialogAddCostComponent>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
      }
    )
  }

  onAdd() {
    this.form.disable()
    this.costService.create(this.form.value).subscribe(response => {
      this.form.enable()
      this.dialogCost.close(response)
    },)

  }

  onClose() {
    this.dialogCost.close()
  }

  ngAfterViewInit(): void {

  }
}
