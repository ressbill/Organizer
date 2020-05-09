import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {MatDialog} from "@angular/material/dialog"
import {ErrorComponent} from "../../../shared/error-component/error.component"
import {AuthService} from "../auth.service"
import {Subscription} from "rxjs"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  title = 'Welcome back!'
  loading = true
  logSub: Subscription
  constructor(private route: ActivatedRoute,
              private matDialog: MatDialog,
              private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loading = false
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
    this.logSub = this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.title = 'Start now!'
      } else if (params['sessionExpired']) {
        this.matDialog.open(ErrorComponent, {data: {message: 'Session expired. Enter again'}})
      }
      else if (params['accessDenied']){
        this.title = 'Please enter the system'
      }
      else if (params['logout']){
        this.title = 'You logout'
      }
    })

  }

  onSubmit() {
    this.loading = true
    this.authService.login(this.form.value).subscribe(response=>{
      this.router.navigate(['/overview'])
    },
      error => {
        this.loading = false
        this.form.enable()
        this.form.reset()
      })
  }

  ngOnDestroy(): void {
    if(this.logSub){
      this.logSub.unsubscribe()
    }

  }
}
