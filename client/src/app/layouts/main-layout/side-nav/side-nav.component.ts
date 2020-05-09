import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {animate, state, style, transition, trigger} from "@angular/animations"
import {AuthService} from "../../../authentication/auth.service"


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('create', [
      state('start', style(
        {
          height: '94vh'
        }
      )),
      state('end', style(
        {
          height: '0'
        }
      )),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(300, style({
          height: '94vh',
          opacity: 0.8,
          background:'#9e9e9e'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 0.8,
          height: '94vh'
        }),
        animate(300, style({
          opacity: 0,
          height: 0
        }))
      ])

    ])
  ]
})
export class SideNavComponent implements OnInit, AfterViewInit {
  navState = 'start'
  //visible = false
  @Input() visible
  @ViewChild('parent') navBar: ElementRef
  constructor(private auth:AuthService) {
  }

  ngOnInit(): void {
  }

  animate() {
    this.navState = this.navState === 'end' ? 'start' : 'end'
  }
  ngAfterViewInit(): void {
  }


  logout() {
    this.auth.logout()
  }
}
