import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HomeworkComment } from '../_models/homework-comment';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeworkCommentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/homeworkComment/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all HomeworkComments
  getHomeworkComments(page?, itemsPerPage?, homeworkCommentParams?): Observable<PaginatedResult<HomeworkComment[]>>{
    const paginatedResult : PaginatedResult<HomeworkComment[]> = new PaginatedResult<HomeworkComment[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(homeworkCommentParams != null)
    {
      if(homeworkCommentParams.orderBy != null)
      params = params.append("orderBy", homeworkCommentParams.orderBy);

      if(homeworkCommentParams.searchBy != null)
      params = params.append("searchBy", homeworkCommentParams.searchBy);

      if(homeworkCommentParams.searchValue != null)
      params = params.append("searchValue", homeworkCommentParams.searchValue);

      if(homeworkCommentParams.reverseOrder != null)
      params = params.append("reverseOrder", homeworkCommentParams.reverseOrder);
    }


    return this.http.get<HomeworkComment[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting HomeworkComment By ID
  getHomeworkComment(id: number): Observable<HomeworkComment>{
    return this.http.get<HomeworkComment>(this.baseUrl+id);
  }

  // Delete HomeworkComment by ID
  deleteHomeworkCommentById(id:number): Observable<HomeworkComment>{
    return this.http.delete<HomeworkComment>(this.baseUrl+id, this.httpOptions);
  }

  // Create HomeworkComment
  createHomeworkComment(model: any): Observable<HomeworkComment>{
    return this.http.post<HomeworkComment>(this.baseUrl,model,this.httpOptions);
  }

  // Edit HomeworkComment
  editHomeworkComment(id:number , model:any): Observable<HomeworkComment>{
    return this.http.put<HomeworkComment>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting HomeworkComments
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
