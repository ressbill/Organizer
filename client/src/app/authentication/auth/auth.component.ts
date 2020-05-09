import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {AuthService} from "../auth.service"
import {Router} from "@angular/router"
import {Subscription} from "rxjs"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup
  title = 'Sign up'
  loading = true
  authSub: Subscription
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = false
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  onSignUp() {
    this.form.disable()
    this.loading = true
    this.authSub = this.authService.register(this.form.value).subscribe((response) => {
        this.loading = false
        this.form.enable()
        console.log(response)

        this.router.navigate(['login'], {
          queryParams: {
            registered: true,
            newUser: true
          }
        })
      },
      error => {
        this.loading = false
        this.form.enable()
        this.form.reset()
      }
    )

  }

  ngOnDestroy(): void {
    if(this.authSub){
      this.authSub.unsubscribe()
    }

  }
}
