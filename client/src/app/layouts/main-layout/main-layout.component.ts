import {AfterViewInit, Component, OnInit} from '@angular/core'
import {AuthService} from "../../authentication/auth.service"

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  title = 'Organizer'

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('.dropdown').foundation()

  }

  logout() {
    this.auth.logout()
  }
}
