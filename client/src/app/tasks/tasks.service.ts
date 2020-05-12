import {Injectable} from "@angular/core"
import {HttpClient, HttpParams} from "@angular/common/http"
import {Observable} from "rxjs"
import {Message, Task} from "../../shared/interfaces"

@Injectable({providedIn: 'root'})
export class TasksService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Task[]| Task> {
    return this.http.get<Task[]>('/api/organizer/tasks', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>('/api/organizer/tasks', task)
  }

  delete(task: Task): Observable<Message>{
    return this.http.delete<Message>(`/api/organizer/tasks/${task._id}`)
  }
  edit(task: Task): Observable<Message>{
    return this.http.patch<Message>(`/api/organizer/tasks/${task._id}`, task)
  }
}
