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

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      text: new FormControl(null)
    })
    this.sub = this.tasksService.fetch().subscribe((tasks) => {
      this.tasks.concat(tasks)
      console.log(this.tasks)
      console.log('server response', tasks)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngAfterViewInit(): void {
}
}
