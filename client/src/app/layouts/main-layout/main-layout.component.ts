import {AfterViewInit, Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  title = 'Organizer'
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('.dropdown').foundation()

  }
}
