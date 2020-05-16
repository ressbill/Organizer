import {Component, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {Task, TaskDialog} from "../../../shared/interfaces"
import {MatDatepicker} from "@angular/material/datepicker"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {TasksService} from "../tasks.service"
import {Subscription} from "rxjs"

@Component({
  templateUrl: 'dialog-task.component.html',
  styleUrls: ['dialog-task.component.scss'],
  selector: 'dialog-edit'
})
export class DialogTaskComponent implements OnInit, OnDestroy{
  @ViewChild('picker') datePicker: MatDatepicker<any>
  sub: Subscription
  form: FormGroup
  constructor(
    private taskService: TasksService,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: TaskDialog) {}

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

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.form.disable()
    const newDate = new Date(this.form.value['date'])
    const time = this.form.value['time']
    if (time) {
      const slicedTime = time.split(':')
      newDate.setHours(slicedTime[0], slicedTime[1])
    }
    const task: Task = {
      name: this.form.get('name').value,
      date: newDate,
      text: this.form.get('text').value,
      _id: this.taskData._id
    }
    console.log(task)
   this.datePicker._selected = '11/02/2020'
    this.sub = this.taskService.patch(task).subscribe((response) => {
      this.form.enable()
      const {_id, name, text, date } = response
      const modifiedResponse = {_id, name, text, date}
      console.log(modifiedResponse)
      this.dialogRef.close(modifiedResponse)
    })

  }

  closeModal() {
   // this.dialogRef.close();
  }

  openModal() {
  }

  showPickerValue() {
  console.log(this.datePicker)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}

