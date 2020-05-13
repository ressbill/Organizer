import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Filter, Message, Task} from "../../shared/interfaces"
import {TasksService} from "./tasks.service"
import {Subscription} from "rxjs"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {MatCheckbox} from "@angular/material/checkbox"
import {MatDatepicker} from "@angular/material/datepicker"
import {WindowRef} from "../../shared/windowref.service"
import {MatSnackBar} from "@angular/material/snack-bar"
import {MatDialog} from "@angular/material/dialog"
import {DialogTaskComponent} from "../../shared/dialog-task-component/dialog-task.component"

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('singleDate') singleDate: ElementRef
  @ViewChild('history') historyRef: MatCheckbox
  @ViewChild('singlePicker') pickerRef: MatDatepicker<any>
  tasks: Task[] = []
  sub: Subscription
  form: FormGroup
  emptyResponse = false
  sending = false
  isLoading = true
  smallLoading = false
  limit = 5
  offset = 0
  step = 2
  chosenDate: any
  filterApplied = false

  constructor(private tasksService: TasksService,
              public windowRef: WindowRef,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog
              ) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      text: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null)
    })
    this.fetch()

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }

  }

  ngAfterViewInit(): void {
    console.log(window)
  }

  //Resetting all controls except date. Sending task to a server.
  // After creation fetch data from server
  createPost() {
    this.clearFilter()
    this.emptyResponse = false
    this.sending = true
    this.isLoading = true
    const date = this.form.value['date']
    const time = this.form.value['time']
    if (time) {
      const slicedTime = time.split(':')
      date.setHours(slicedTime[0], slicedTime[1])
    }
    const task: Task = {
      name: this.form.get('name').value,
      date: date,
      text: this.form.get('text').value
    }
    this.form.get('name').clearValidators()
    this.form.reset()
    this.form.get('date').setValue(task.date)
    this.tasksService.create(task).subscribe((response) => {
        this._snackBar.open('Post created successfully', 'Ok!', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
        this.tasks = []
        this.offset = 0
        this.limit = 5
        this.fetch()
      },
      error => {
        this.isLoading = false
      })

  }

  setNameValidators() {
    this.sending = false
    this.form.get('name').setValidators([Validators.required, Validators.minLength(3)])
    this.form.get('name').updateValueAndValidity()
    this.form.updateValueAndValidity()
  }

  loadMore() {
    const filter: Filter = {}
    if (this.filterApplied) {
      if (this.historyRef.checked === true) {
        filter.previous = 'true'
      }
      const selectedDate = this.singleDate.nativeElement.value
      if (selectedDate) {
        filter.date = selectedDate
      }
      this.limit = this.step
      this.smallLoading = true
      return this.fetch(filter)
    }

    this.limit = this.step
    this.fetch()
    this.smallLoading = true
  }

  clearFilter() {
    this.filterApplied = false
    this.historyRef.checked = false
    this.chosenDate = null
    this.singleDate.nativeElement.value = null
    this.pickerRef._selected = null
  }

  applyFilter() {
    this.filterApplied = true
    this.isLoading = true
    this.tasks = []
    this.offset = 0

    this.chosenDate = this.singleDate.nativeElement.value
    const filter: Filter = {}
    if (this.historyRef.checked === true) {
      filter.previous = 'true'
    }
    const selectedDate = this.singleDate.nativeElement.value
    if (selectedDate) {
      filter.date = selectedDate
    }
    this.limit = 5
    filter.limit = 5
    this.fetch(filter)

  }

  onDeleteTask(task: Task) {
    this.isLoading = true
    this.tasksService.delete(task).subscribe((response: Message) => {
      const taskIndex = this.tasks.findIndex(t => t._id = task._id)
      this.tasks.splice(taskIndex, 1)
      this.isLoading = false
      this._snackBar.open(response.message, 'Ok!', {
        duration: 2000,
      })
    })
  }

  onEditTask(task: Task) {
    let taskDialog = this.dialog.open(DialogTaskComponent, {
      data: task,
      width: '1000px',
    })
    taskDialog.afterClosed().subscribe(result => {
      if(result){
        console.log('Closed with: ', result)
      }
    })
    this.tasksService.edit(task)
  }

  private fetch(filter: Filter = {}) {
    this.emptyResponse = false
    const params = {
      offset: this.offset,
      limit: this.limit,

    }
    const concatFilter = {...params, ...filter}
    console.log(concatFilter)
    this.sub = this.tasksService.fetch(concatFilter).subscribe((response: Task[]) => {
      console.log(response)
      if (response.length < this.limit) {
        this.emptyResponse = true
      }
      this.offset += this.limit
      this.isLoading = false
      this.smallLoading = false
      this.tasks = this.tasks.concat(response)
    })
  }
}
