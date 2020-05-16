import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {CostService} from "../costs/cost.service"
import {Cost} from "../../../shared/interfaces"
import {Subscription} from "rxjs"
import {MatCheckbox} from "@angular/material/checkbox"

@Component({
  selector: 'app-edit-costs-form',
  templateUrl: './edit-costs-form.component.html',
  styleUrls: ['./edit-costs-form.component.scss']
})
export class EditCostsFormComponent implements OnInit, OnDestroy, OnChanges {
  form: FormGroup
  sending = false
  sub: Subscription
  newCost = true
  @Input() costForUpdate: Cost
  @Output() emitCreatedCost: EventEmitter<Cost> = new EventEmitter<Cost>()
  @Output() emitUpdatedCost: EventEmitter<Cost> = new EventEmitter<Cost>()
  @Output() reset: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('checkbox') checkbox: MatCheckbox

  constructor(private costService: CostService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })
  }

  onSave() {
    this.form.disable()
    if (!this.newCost) {
      const cost = {...this.form.value}
      cost._id = this.costForUpdate._id
      this.costService.update(cost).subscribe(updatedCost => {
        this.emitUpdatedCost.emit(updatedCost)
        this.form.reset()
        this.newCost = true
        this.form.enable()
      })
    } else {
      this.sub = this.costService.create(this.form.value).subscribe(createdCost => {
        this.form.reset()
        this.emitCreatedCost.emit(createdCost)
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
    this.newCost = true
    this.form.reset()
    this.reset.emit(null)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.costForUpdate) {
      this.form.patchValue({name: this.costForUpdate.name, price: this.costForUpdate.price})
      this.form.updateValueAndValidity()
      this.newCost = false
      this.checkbox.checked = false;
    }
  }
}
