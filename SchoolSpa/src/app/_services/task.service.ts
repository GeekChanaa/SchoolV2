import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Task } from '../_models/task';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/task/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Tasks
  getTasks(page?, itemsPerPage?, taskParams?): Observable<PaginatedResult<Task[]>>{
    const paginatedResult : PaginatedResult<Task[]> = new PaginatedResult<Task[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(taskParams != null)
    {
      if(taskParams.orderBy != null)
      params = params.append("orderBy", taskParams.orderBy);

      if(taskParams.searchBy != null)
      params = params.append("searchBy", taskParams.searchBy);

      if(taskParams.searchValue != null)
      params = params.append("searchValue", taskParams.searchValue);

      if(taskParams.reverseOrder != null)
      params = params.append("reverseOrder", taskParams.reverseOrder);
    }


    return this.http.get<Task[]>(this.baseUrl, {observe : 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') != null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      )
  }

  // Getting Task By ID
  getTask(id: number): Observable<Task>{
    return this.http.get<Task>(this.baseUrl+id);
  }

  // Delete Task by ID
  deleteTaskById(id:number): Observable<Task>{
    return this.http.delete<Task>(this.baseUrl+id, this.httpOptions);
  }

  // Create Task
  createTask(model: any): Observable<Task>{
    return this.http.post<Task>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Task
  editTask(id:number , model:any): Observable<Task>{
    return this.http.put<Task>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Tasks
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
