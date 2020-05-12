import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
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
          height: '100vh'
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
          height: '100vh',
          opacity: 0.8,
          background:'#9e9e9e'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 0.8,
          height: '100vh'
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
  @Input() visible

  @ViewChild('parent') navBar: ElementRef
  constructor(private auth:AuthService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


  logout() {
    this.auth.logout()
  }
}
