import {AfterViewInit, Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog"
import {Income} from "../../../shared/interfaces"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {IncomeService} from "../income/income.service"

@Component({
  selector: 'app-dialog-add-income',
  templateUrl: './dialog-add-income.component.html',
  styleUrls: ['./dialog-add-income.component.scss']
})
export class DialogAddIncomeComponent implements OnInit, AfterViewInit {
  form: FormGroup
  constructor( @Inject(MAT_DIALOG_DATA) public income: Income,
               private incomeService: IncomeService,
               public dialogIncome: MatDialogRef<DialogAddIncomeComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
    }

    )
  }

  onAdd() {
    this.form.disable()
    this.incomeService.create(this.form.value).subscribe(response => {
      this.form.enable()
      this.dialogIncome.close(response)
    },)

  }
  onClose(){

    this.dialogIncome.close()
  }

  ngAfterViewInit(): void {

  }
}
