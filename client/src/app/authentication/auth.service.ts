import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {AuthData} from "../../shared/interfaces"
import {tap} from "rxjs/operators"
import {Router} from "@angular/router"

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string = null

  constructor(private http: HttpClient, private router: Router) {
  }

  register(formData: AuthData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/auth/register', formData)
  }

  login(formData: AuthData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', formData)
      .pipe(
        tap(({token}) => {
          this.token = token
          localStorage.setItem('token', token)
        })
      )
  }

  isAuthorized() {
    return !!this.token
  }

  setToken(token: string) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  logout() {
    this.token = null
    localStorage.removeItem('token')
    this.router.navigate(['login'], {
      queryParams: {
        logout: true
      }
    })
  }

}
