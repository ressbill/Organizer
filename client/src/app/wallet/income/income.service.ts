import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Income, Message} from "../../../shared/interfaces"

@Injectable({providedIn: 'root'})
export class IncomeService {
  constructor(private http: HttpClient) {

  }

  create(income: Income): Observable<Income> {
    return this.http.post<Income>('/api/wallet/income', income)
  }

  fetch(): Observable<Income[]> {
    return this.http.get<Income[]>('api/wallet/income')
  }

  update(income: Income): Observable<Income> {
    return this.http.patch<Income>(`api/wallet/income/${income._id}`, income)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/wallet/income/${id}`)
  }
}
