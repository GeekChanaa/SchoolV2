import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Training } from '../_models/training';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/training/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Trainings
  getTrainings(page?, itemsPerPage?, trainingParams?): Observable<PaginatedResult<Training[]>>{
    const paginatedResult : PaginatedResult<Training[]> = new PaginatedResult<Training[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(trainingParams != null)
    {
      if(trainingParams.orderBy != null)
      params = params.append("orderBy", trainingParams.orderBy);

      if(trainingParams.searchBy != null)
      params = params.append("searchBy", trainingParams.searchBy);

      if(trainingParams.searchValue != null)
      params = params.append("searchValue", trainingParams.searchValue);

      if(trainingParams.reverseOrder != null)
      params = params.append("reverseOrder", trainingParams.reverseOrder);
    }


    return this.http.get<Training[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Training By ID
  getTraining(id: number): Observable<Training>{
    return this.http.get<Training>(this.baseUrl+id);
  }

  // Delete Training by ID
  deleteTrainingById(id:number): Observable<Training>{
    return this.http.delete<Training>(this.baseUrl+id, this.httpOptions);
  }

  // Create Training
  createTraining(model: any): Observable<Training>{
    return this.http.post<Training>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Training
  editTraining(id:number , model:any): Observable<Training>{
    return this.http.put<Training>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
