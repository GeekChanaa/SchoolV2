import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Exam } from '../_models/exam';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/exam/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Exams
  getExams(page?, itemsPerPage?, examParams?): Observable<PaginatedResult<Exam[]>>{
    const paginatedResult : PaginatedResult<Exam[]> = new PaginatedResult<Exam[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(examParams != null)
    {
      if(examParams.orderBy != null)
      params = params.append("orderBy", examParams.orderBy);

      if(examParams.searchBy != null)
      params = params.append("searchBy", examParams.searchBy);

      if(examParams.searchValue != null)
      params = params.append("searchValue", examParams.searchValue);

      if(examParams.reverseOrder != null)
      params = params.append("reverseOrder", examParams.reverseOrder);
    }


    return this.http.get<Exam[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Exam By ID
  getExam(id: number): Observable<Exam>{
    return this.http.get<Exam>(this.baseUrl+id);
  }

  // Delete Exam by ID
  deleteExamById(id:number): Observable<Exam>{
    return this.http.delete<Exam>(this.baseUrl+id, this.httpOptions);
  }

  // Create Exam
  createExam(model: any): Observable<Exam>{
    return this.http.post<Exam>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Exam
  editExam(id:number , model:any): Observable<Exam>{
    return this.http.put<Exam>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Exams
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
