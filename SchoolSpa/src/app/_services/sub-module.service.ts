import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { SubModule } from '../_models/sub-module';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SubModuleService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/subModule/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all SubModules
  getSubModules(page?, itemsPerPage?, subModuleParams?): Observable<PaginatedResult<SubModule[]>>{
    const paginatedResult : PaginatedResult<SubModule[]> = new PaginatedResult<SubModule[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(subModuleParams != null)
    {
      if(subModuleParams.orderBy != null)
      params = params.append("orderBy", subModuleParams.orderBy);

      if(subModuleParams.searchBy != null)
      params = params.append("searchBy", subModuleParams.searchBy);

      if(subModuleParams.searchValue != null)
      params = params.append("searchValue", subModuleParams.searchValue);

      if(subModuleParams.reverseOrder != null)
      params = params.append("reverseOrder", subModuleParams.reverseOrder);
    }


    return this.http.get<SubModule[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting SubModule By ID
  getSubModule(id: number): Observable<SubModule>{
    return this.http.get<SubModule>(this.baseUrl+id);
  }

  // Delete SubModule by ID
  deleteSubModuleById(id:number): Observable<SubModule>{
    return this.http.delete<SubModule>(this.baseUrl+id, this.httpOptions);
  }

  // Create SubModule
  createSubModule(model: any): Observable<SubModule>{
    return this.http.post<SubModule>(this.baseUrl,model,this.httpOptions);
  }

  // Edit SubModule
  editSubModule(id:number , model:any): Observable<SubModule>{
    return this.http.put<SubModule>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting SubModules
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
