import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core'
import {Task} from "../../shared/interfaces"
import {TasksService} from "./tasks.service"
import {Subscription} from "rxjs"
import {FormControl, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy, AfterViewInit {
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
    this.limit = this.step
    this.fetch()
    this.smallLoading = true
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.sub = this.tasksService.fetch(params).subscribe((response: Task[]) => {
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
