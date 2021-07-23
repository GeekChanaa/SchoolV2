import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { PaginatedResult } from '../_models/pagination';
import { Translation } from '../_models/translation';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/translation/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Translations
  getTranslations(page?, itemsPerPage?, translationParams?): Observable<PaginatedResult<Translation[]>>{
    const paginatedResult : PaginatedResult<Translation[]> = new PaginatedResult<Translation[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(translationParams != null)
    {
      if(translationParams.orderBy != null)
      params = params.append("orderBy", translationParams.orderBy);

      if(translationParams.searchBy != null)
      params = params.append("searchBy", translationParams.searchBy);

      if(translationParams.searchValue != null)
      params = params.append("searchValue", translationParams.searchValue);

      if(translationParams.reverseOrder != null)
      params = params.append("reverseOrder", translationParams.reverseOrder);
    }


    return this.http.get<Translation[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Translation By ID
  getTranslation(id: number): Observable<Translation>{
    return this.http.get<Translation>(this.baseUrl+id);
  }

  // Delete Translation by ID
  deleteTranslationById(id:number): Observable<Translation>{
    return this.http.delete<Translation>(this.baseUrl+id, this.httpOptions);
  }

  // Create Translation
  createTranslation(model: any): Observable<Translation>{
    return this.http.post<Translation>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Translation
  editTranslation(id:number , model:any): Observable<Translation>{
    return this.http.put<Translation>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Translations
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
