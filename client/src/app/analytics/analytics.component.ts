import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import {AnalyticsService} from "../overview/analytics.service"
import {Chart} from 'chart.js'
import {Subscription} from "rxjs"
import {CostsChart, CostsData, IncomeChart, IncomeData} from "../../shared/interfaces"

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true
  @ViewChild('costs') costsRef: ElementRef
  @ViewChild('income') incomeRef: ElementRef
  noWallet = false
  sub: Subscription
  costs: CostsChart[]
  income: IncomeChart[]
  costStats: CostsData
  incomeStats: IncomeData
  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.sub = this.analyticsService.fetch().subscribe(response => {
      this.isLoading = false
      if(response['message']){
        this.noWallet = true
      } else {
        this.noWallet = false
        this.costStats = response.costs
        this.incomeStats = response.income
        this.costs = response.costsChart
        this.income = response.incomeChart
        const costsCfg: any = {}
        costsCfg.labels = this.costs.map(c=> c.label)
        costsCfg.data  = this.costs.map(c=> c.costs)
        costsCfg.label = 'Costs By Day'
        costsCfg.backgroundColor = '#ffcdd2'
        costsCfg.borderColor = '#f44336'
        const incomeCfg: any = {}
        incomeCfg.labels = this.income.map(i=> i.label)
        incomeCfg.data  = this.income.map(i=> i.income)
        incomeCfg.label = 'Income By Day'
        incomeCfg.backgroundColor = '#b3e5fc'
        incomeCfg.borderColor = '#03a9f4'
        const costsCtx = this.costsRef.nativeElement.getContext('2d')
        costsCtx.canvas.height = '400px'
        new Chart(costsCtx, chartBarCfg(costsCfg))
        const incomeCtx = this.incomeRef.nativeElement.getContext('2d')
        incomeCtx.canvas.height = '400px'
        new Chart(incomeCtx, chartBarCfg(incomeCfg))
      }

    })



  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }



}

function chartBarCfg({label, labels, data, backgroundColor,  borderColor}) {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: label,
          data: data,
          fill: false,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        }
      ],

    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          }
        ],
      }


    }
  }
}
