import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Chapter } from '../_models/chapter';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/chapter/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Chapters
  getChapters(page?, itemsPerPage?, chapterParams?): Observable<PaginatedResult<Chapter[]>>{
    const paginatedResult : PaginatedResult<Chapter[]> = new PaginatedResult<Chapter[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(chapterParams != null)
    {
      if(chapterParams.orderBy != null)
      params = params.append("orderBy", chapterParams.orderBy);

      if(chapterParams.searchBy != null)
      params = params.append("searchBy", chapterParams.searchBy);

      if(chapterParams.searchValue != null)
      params = params.append("searchValue", chapterParams.searchValue);

      if(chapterParams.reverseOrder != null)
      params = params.append("reverseOrder", chapterParams.reverseOrder);
    }


    return this.http.get<Chapter[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Chapter By ID
  getChapter(id: number): Observable<Chapter>{
    return this.http.get<Chapter>(this.baseUrl+id);
  }

  // Delete Chapter by ID
  deleteChapterById(id:number): Observable<Chapter>{
    return this.http.delete<Chapter>(this.baseUrl+id, this.httpOptions);
  }

  // Create Chapter
  createChapter(model: any): Observable<Chapter>{
    return this.http.post<Chapter>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Chapter
  editChapter(id:number , model:any): Observable<Chapter>{
    return this.http.put<Chapter>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Chapters
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
