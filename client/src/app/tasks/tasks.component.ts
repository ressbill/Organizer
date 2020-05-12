import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Filter, Task} from "../../shared/interfaces"
import {TasksService} from "./tasks.service"
import {Subscription} from "rxjs"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {MatCheckbox} from "@angular/material/checkbox"
import {MatDatepicker} from "@angular/material/datepicker"

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

  constructor(private tasksService: TasksService) {
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
    if (this.historyRef.checked === true) {
      filter.previous = 'true'
    }
    const selectedDate = this.singleDate.nativeElement.value
    if(selectedDate) {
      filter.date = selectedDate
    }
    this.limit = this.step
    this.fetch(filter)
    this.smallLoading = true
  }

  clearFilter() {
    this.historyRef.checked = false
    this.chosenDate = null
    this.singleDate.nativeElement.value = null
    this.pickerRef._selected = null
  }

  applyFilter() {
    this.isLoading = true
    this.tasks = []
    this.offset = 0
    this.chosenDate = this.singleDate.nativeElement.value
    const filter: Filter = {}
    if (this.historyRef.checked === true) {
      filter.previous = 'true'
    }
    const selectedDate = this.singleDate.nativeElement.value
    if(selectedDate) {
      filter.date = selectedDate
    }
    filter.limit = 5;
    this.fetch(filter)

  }

  private fetch(filter: Filter = {}) {
    const params = {
      offset: this.offset,
      limit: this.limit,

    }
    const concatFilter = {...params, ...filter}
    console.log(concatFilter)
    this.sub = this.tasksService.fetch(concatFilter).subscribe((response: Task[]) => {
      console.log(response)
      if (response.length < this.step) {
        this.emptyResponse = true
      }
      this.offset += this.limit
      this.isLoading = false
      this.smallLoading = false
      this.tasks = this.tasks.concat(response)
    })
  }

}
