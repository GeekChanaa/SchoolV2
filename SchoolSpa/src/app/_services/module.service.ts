import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Module } from '../_models/module';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/module/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Modules
  getModules(page?, itemsPerPage?, moduleParams?): Observable<PaginatedResult<Module[]>>{
    const paginatedResult : PaginatedResult<Module[]> = new PaginatedResult<Module[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(moduleParams != null)
    {
      if(moduleParams.orderBy != null)
      params = params.append("orderBy", moduleParams.orderBy);

      if(moduleParams.searchBy != null)
      params = params.append("searchBy", moduleParams.searchBy);

      if(moduleParams.searchValue != null)
      params = params.append("searchValue", moduleParams.searchValue);

      if(moduleParams.reverseOrder != null)
      params = params.append("reverseOrder", moduleParams.reverseOrder);
    }


    return this.http.get<Module[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Module By ID
  getModule(id: number): Observable<Module>{
    return this.http.get<Module>(this.baseUrl+id);
  }

  // Delete Module by ID
  deleteModuleById(id:number): Observable<Module>{
    return this.http.delete<Module>(this.baseUrl+id, this.httpOptions);
  }

  // Create Module
  createModule(model: any): Observable<Module>{
    return this.http.post<Module>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Module
  editModule(id:number , model:any): Observable<Module>{
    return this.http.put<Module>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Modules
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
