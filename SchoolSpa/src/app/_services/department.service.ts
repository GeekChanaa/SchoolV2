import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Department } from '../_models/department';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/department/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Departments
  getDepartments(page?, itemsPerPage?, departmentParams?): Observable<PaginatedResult<Department[]>>{
    const paginatedResult : PaginatedResult<Department[]> = new PaginatedResult<Department[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(departmentParams != null)
    {
      if(departmentParams.orderBy != null)
      params = params.append("orderBy", departmentParams.orderBy);

      if(departmentParams.searchBy != null)
      params = params.append("searchBy", departmentParams.searchBy);

      if(departmentParams.searchValue != null)
      params = params.append("searchValue", departmentParams.searchValue);

      if(departmentParams.reverseOrder != null)
      params = params.append("reverseOrder", departmentParams.reverseOrder);
    }


    return this.http.get<Department[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Department By ID
  getDepartment(id: number): Observable<Department>{
    return this.http.get<Department>(this.baseUrl+id);
  }

  // Delete Department by ID
  deleteDepartmentById(id:number): Observable<Department>{
    return this.http.delete<Department>(this.baseUrl+id, this.httpOptions);
  }

  // Create Department
  createDepartment(model: any): Observable<Department>{
    return this.http.post<Department>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Department
  editDepartment(id:number , model:any): Observable<Department>{
    return this.http.put<Department>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
