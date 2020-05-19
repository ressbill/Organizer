import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Subscription} from "rxjs"
import {Income} from "../../../../shared/interfaces"
import {MatCheckbox} from "@angular/material/checkbox"
import {IncomeService} from "../income.service"

@Component({
  selector: 'app-edit-income-form',
  templateUrl: './edit-income-form.component.html',
  styleUrls: ['./edit-income-form.component.scss']
})
export class EditIncomeFormComponent implements OnInit, OnChanges {
  form: FormGroup
  sending = false
  sub: Subscription
  newIncome = true
  disableBtn = false
  @Input() incomeForUpdate: Income
  @Output() emitCreatedIncome: EventEmitter<Income> = new EventEmitter<Income>()
  @Output() emitUpdatedIncome: EventEmitter<Income> = new EventEmitter<Income>()
  @Output() reset: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('checkbox') checkbox: MatCheckbox

  constructor(private incomeService: IncomeService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  onSave() {
    this.form.disable()
    if (!this.newIncome) {
      const income = {...this.form.value}
      income._id = this.incomeForUpdate._id
      this.incomeService.update(income).subscribe(updatedIncome => {
        this.emitUpdatedIncome.emit(updatedIncome)

        this.newIncome = true
        this.form.enable()
        this.disableBtn = true
        this.form.get('name').clearValidators()
        this.form.get('amount').clearValidators()
        this.form.reset()


      })
    } else {
      this.sub = this.incomeService.create(this.form.value).subscribe(createdIncome => {
        this.disableBtn = true
        this.form.get('name').clearValidators()
        this.form.get('amount').clearValidators()
        this.form.reset()
        this.emitCreatedIncome.emit(createdIncome)
        this.form.enable()
      })
    }

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }

  }

  resetToNew() {
    this.newIncome = true
    this.form.reset()
    this.reset.emit(null)
  }

  setValidatorsName() {
    this.form.get('name').setValidators(Validators.required)
    this.form.get('name').updateValueAndValidity()
    this.form.updateValueAndValidity()

    if ((this.form.get('amount').value)) {
      this.disableBtn = false

      this.form.updateValueAndValidity()
    }

  }

  setValidatorsPrice() {
    this.form.get('amount').setValidators(Validators.required)
    this.form.get('amount').updateValueAndValidity()
    this.form.updateValueAndValidity()
    if (this.form.get('name').value) {
      this.disableBtn = false

    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.incomeForUpdate) {
      this.form.patchValue({name: this.incomeForUpdate.name, amount: this.incomeForUpdate.amount})//
      this.form.updateValueAndValidity()
      this.newIncome = false
      this.checkbox.checked = false
      this.disableBtn = false
    }
  }

}
