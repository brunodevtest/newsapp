import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class ArticleService {
    
    public apiURL: string='https://newsserver20240719092101.azurewebsites.net/api/Article/GetLatest?page=';
    public actualPage: number=1;
    actualPageChange: Subject<number> = new Subject<number>();
    list: Subject<Article[]>= new Subject<Article[]>();

    constructor(private http: HttpClient) {
      this.actualPageChange.subscribe((value) => {
      this.actualPage = value
  });}
  
    getArticles() {
      return this.http.get<Article[]>(this.apiURL+this.actualPage.toString());
    }

    setPage(page: number) {
      this.actualPageChange.next(page);
    }

  }
