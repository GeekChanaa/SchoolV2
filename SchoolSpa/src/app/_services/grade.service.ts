import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Grade } from '../_models/Grade';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/grade/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Grades
  getGrades(page?, itemsPerPage?, gradeParams?): Observable<PaginatedResult<Grade[]>>{
    const paginatedResult : PaginatedResult<Grade[]> = new PaginatedResult<Grade[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(gradeParams != null)
    {
      if(gradeParams.orderBy != null)
      params = params.append("orderBy", gradeParams.orderBy);

      if(gradeParams.searchBy != null)
      params = params.append("searchBy", gradeParams.searchBy);

      if(gradeParams.searchValue != null)
      params = params.append("searchValue", gradeParams.searchValue);

      if(gradeParams.reverseOrder != null)
      params = params.append("reverseOrder", gradeParams.reverseOrder);
    }


    return this.http.get<Grade[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Grade By ID
  getGrade(id: number): Observable<Grade>{
    return this.http.get<Grade>(this.baseUrl+id);
  }

  // Delete Grade by ID
  deleteGradeById(id:number): Observable<Grade>{
    return this.http.delete<Grade>(this.baseUrl+id, this.httpOptions);
  }

  // Create Grade
  createGrade(model: any): Observable<Grade>{
    return this.http.post<Grade>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Grade
  editGrade(id:number , model:any): Observable<Grade>{
    return this.http.put<Grade>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Grades
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
