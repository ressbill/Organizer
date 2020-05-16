import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Cost, Message} from "../../../shared/interfaces"

@Injectable({providedIn: 'root'})
export class CostService {
  constructor(private http: HttpClient) {

  }

  create(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>('/api/wallet/costs', cost)
  }

  fetch(): Observable<Cost[]> {
    return this.http.get<Cost[]>('api/wallet/costs')
  }

  update(cost: Cost): Observable<Cost> {
    return this.http.patch<Cost>(`api/wallet/costs/${cost._id}`, cost)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/wallet/costs/${id}`)
  }
}
