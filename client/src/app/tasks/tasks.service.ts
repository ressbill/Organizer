import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Task} from "../../shared/interfaces"

@Injectable({providedIn: 'root'})
export class TasksService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/organizer/tasks')
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>('/api/organizer/tasks', task)
  }
}
