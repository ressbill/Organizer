import {Injectable} from "@angular/core"
import {HttpClient, HttpParams} from "@angular/common/http"
import {Observable} from "rxjs"
import {AnalyticsData} from "../../shared/interfaces"

@Injectable({providedIn: 'root'})
export class AnalyticsService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>('/api/analytics/overview', {
      params: new HttpParams({fromObject: params})
    })
  }


}
