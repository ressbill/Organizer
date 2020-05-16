import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {catchError} from "rxjs/operators"
import {Observable, throwError} from "rxjs"
import {MatDialog} from "@angular/material/dialog"
import {ErrorComponent} from "./error-component/error.component"
import {Router} from "@angular/router"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private matDialog:MatDialog, private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred'
          if (error.error.message){
            errorMessage = error.error.message
          }
          if(error.status === 401){
            this.router.navigate(['/login'], {
              queryParams: {
                sessionExpired: true
              }
            })
            return throwError(error)
          }
          this.matDialog.open(ErrorComponent, {data: {message: errorMessage}})
          return throwError(error)
        })
      )
  }

}
