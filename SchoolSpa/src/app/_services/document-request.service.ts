import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { DocumentRequest } from '../_models/document-request';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DocumentRequestService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/documentRequest/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Cities
  getCities(page?, itemsPerPage?, documentRequestParams?): Observable<PaginatedResult<DocumentRequest[]>>{
    const paginatedResult : PaginatedResult<DocumentRequest[]> = new PaginatedResult<DocumentRequest[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(documentRequestParams != null)
    {
      if(documentRequestParams.orderBy != null)
      params = params.append("orderBy", documentRequestParams.orderBy);

      if(documentRequestParams.searchBy != null)
      params = params.append("searchBy", documentRequestParams.searchBy);

      if(documentRequestParams.searchValue != null)
      params = params.append("searchValue", documentRequestParams.searchValue);

      if(documentRequestParams.reverseOrder != null)
      params = params.append("reverseOrder", documentRequestParams.reverseOrder);
    }


    return this.http.get<DocumentRequest[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting DocumentRequest By ID
  getDocumentRequest(id: number): Observable<DocumentRequest>{
    return this.http.get<DocumentRequest>(this.baseUrl+id);
  }

  // Delete DocumentRequest by ID
  deleteDocumentRequestById(id:number): Observable<DocumentRequest>{
    return this.http.delete<DocumentRequest>(this.baseUrl+id, this.httpOptions);
  }

  // Create DocumentRequest
  createDocumentRequest(model: any): Observable<DocumentRequest>{
    return this.http.post<DocumentRequest>(this.baseUrl,model,this.httpOptions);
  }

  // Edit DocumentRequest
  editDocumentRequest(id:number , model:any): Observable<DocumentRequest>{
    return this.http.put<DocumentRequest>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
