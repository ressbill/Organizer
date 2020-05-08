import {Component} from '@angular/core'
import {AuthService} from "./authentication/auth.service"

@Component({
  selector: 'app-root',
  template: `
      <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth:AuthService) {
    const candidateToken = localStorage.getItem('token')
    if(candidateToken){
      this.auth.setToken(candidateToken)
    }
  }
}
