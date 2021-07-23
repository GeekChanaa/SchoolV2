import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Homework } from '../_models/homework';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/homework/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Homeworks
  getHomeworks(page?, itemsPerPage?, homeworkParams?): Observable<PaginatedResult<Homework[]>>{
    const paginatedResult : PaginatedResult<Homework[]> = new PaginatedResult<Homework[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(homeworkParams != null)
    {
      if(homeworkParams.orderBy != null)
      params = params.append("orderBy", homeworkParams.orderBy);

      if(homeworkParams.searchBy != null)
      params = params.append("searchBy", homeworkParams.searchBy);

      if(homeworkParams.searchValue != null)
      params = params.append("searchValue", homeworkParams.searchValue);

      if(homeworkParams.reverseOrder != null)
      params = params.append("reverseOrder", homeworkParams.reverseOrder);
    }


    return this.http.get<Homework[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Homework By ID
  getHomework(id: number): Observable<Homework>{
    return this.http.get<Homework>(this.baseUrl+id);
  }

  // Delete Homework by ID
  deleteHomeworkById(id:number): Observable<Homework>{
    return this.http.delete<Homework>(this.baseUrl+id, this.httpOptions);
  }

  // Create Homework
  createHomework(model: any): Observable<Homework>{
    return this.http.post<Homework>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Homework
  editHomework(id:number , model:any): Observable<Homework>{
    return this.http.put<Homework>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Homeworks
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
