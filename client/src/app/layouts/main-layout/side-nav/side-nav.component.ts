import { Component, OnInit } from '@angular/core';
import {state, style, transition, trigger, animate} from "@angular/animations"


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('create', [
      state('start', style( { background: 'blue' })),
      state('end', style({
        background: 'red',
        height: '100vh'
      })),
      transition('start => end', animate(450)),
      transition('end => start', animate('200ms ease-in-out'))
    ])
  ]
})
export class SideNavComponent implements OnInit {
  navState = 'start'
  constructor() { }

  ngOnInit(): void {
  }

  animate() {
    this.navState = this.navState === 'end'? 'start': 'end'
  }
}
