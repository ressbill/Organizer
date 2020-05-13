import {Component, Inject, OnInit, ViewChild} from "@angular/core"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {TaskDialog} from "../interfaces"
import {MatDatepicker} from "@angular/material/datepicker"
import {FormControl, FormGroup, Validators} from "@angular/forms"

@Component({
  templateUrl: 'dialog-task.component.html',
  styleUrls: ['dialog-task.component.scss'],
  selector: 'dialog-edit'
})
export class DialogTaskComponent implements OnInit{
  @ViewChild('picker') datePicker: MatDatepicker<any>
  form: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: TaskDialog) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
   // this.datePicker._selected = '11/02/2020'

    this.dialogRef.close({name: 'hui'})
  }

  closeModal() {
   // this.dialogRef.close();
  }

  openModal() {
  }

  showPickerValue() {
  console.log(this.datePicker)
  }

  ngOnInit(): void {
    let date = new Date(this.taskData.date)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const time = `${hours}:${minutes}`

    console.log(time)
    this.form = new FormGroup({
      name: new FormControl(this.taskData.name, [Validators.required, Validators.minLength(3)]),
      text: new FormControl(this.taskData.text),
      date: new FormControl(this.taskData.date, [Validators.required]),
      time: new FormControl(null)
    })
    this.form.patchValue({time})
  }
}

