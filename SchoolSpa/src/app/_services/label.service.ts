import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Label } from '../_models/label';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/label/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Labels
  getLabels(page?, itemsPerPage?, labelParams?): Observable<PaginatedResult<Label[]>>{
    const paginatedResult : PaginatedResult<Label[]> = new PaginatedResult<Label[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(labelParams != null)
    {
      if(labelParams.orderBy != null)
      params = params.append("orderBy", labelParams.orderBy);

      if(labelParams.searchBy != null)
      params = params.append("searchBy", labelParams.searchBy);

      if(labelParams.searchValue != null)
      params = params.append("searchValue", labelParams.searchValue);

      if(labelParams.reverseOrder != null)
      params = params.append("reverseOrder", labelParams.reverseOrder);
    }


    return this.http.get<Label[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Label By ID
  getLabel(id: number): Observable<Label>{
    return this.http.get<Label>(this.baseUrl+id);
  }

  // Delete Label by ID
  deleteLabelById(id:number): Observable<Label>{
    return this.http.delete<Label>(this.baseUrl+id, this.httpOptions);
  }

  // Create Label
  createLabel(model: any): Observable<Label>{
    return this.http.post<Label>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Label
  editLabel(id:number , model:any): Observable<Label>{
    return this.http.put<Label>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Labels
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
