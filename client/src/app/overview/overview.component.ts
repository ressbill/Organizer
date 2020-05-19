import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {AnalyticsData, Task} from "../../shared/interfaces"
import {Chart} from 'chart.js'
import {TasksService} from "../tasks/tasks.service"
import {forkJoin, Subscription} from "rxjs"
import {AnalyticsService} from "./analytics.service"


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('doughnut') doughnutRef: ElementRef
  sub: Subscription
  isLoading = true
  tasks: Task[] = []
  analytics: AnalyticsData
  totalIncome: number
  totalCosts: number
  noWallet: boolean
  message = ''

  constructor(private taskService: TasksService, private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const joinedSub = forkJoin([
      this.taskService.fetch({limit: 4}),
      this.analyticsService.fetch({month: true})
    ])
    this.sub = joinedSub.subscribe(response => {
      this.isLoading = false
        // @ts-ignore
        this.tasks = response[0]
        if (response[1]['message']) {
         this.message = 'You have got no wallet yet. Get one by adding either an '
          this.noWallet = true
        } else {
          this.noWallet = false
          this.analytics = response[1]
          this.totalCosts = this.analytics.costs.total
          this.totalIncome = this.analytics.income.total

          const doughnutConfig: any = {
            label: 'Costs and Income amount for current month',
            labels: ['Costs', 'Income']
          }
          doughnutConfig.data = [this.totalCosts, this.totalIncome]
          const doughnutCtx = this.doughnutRef.nativeElement.getContext('2d')
          doughnutCtx.canvas.height = '400px'
          new Chart(doughnutCtx, createDoughnutConfig(doughnutConfig))

        }
      }
    )


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()

  }


}

function createDoughnutConfig({labels, label, data}) {
  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderWidth: 4,
          backgroundColor: ["#e57373", "#29b6f6"]
        }
      ]
    }
  }
}
