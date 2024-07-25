import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../interfaces/article';
import { ArticleType } from '../interfaces/article';
import { ArticleTypeIcon } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { AppConstants } from '../app.constants';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ FormsModule, RouterOutlet, CommonModule, MatListModule, MatIconModule, MatDividerModule, DatePipe, FilterPipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})

export class ContentComponent implements OnInit {
  results = {};
  list : Article[];
  filteredList : Article[] = [];
  ArticleTypeIcon = ArticleTypeIcon;
  isDataLoaded: boolean = false;
  errorDetected: boolean = false;
  searchText: string;

  constructor(private articleService: ArticleService, private snackBar: MatSnackBar, public constants: AppConstants) { 
    this.articleService.actualPageChange.subscribe(value => {
      this.renderList();
    });
  }

  public renderList () {
    this.isDataLoaded=false;
    this.articleService.getArticles().subscribe({
      next: (data) => {
        data.map(item => console.log(ArticleType[item.type].toString()));
        this.list = data;
      },
      error: (err) => {
        this.errorDetected = true;
        this.isDataLoaded = true;
        console.log(err);
      },
      complete: () => {
        this.isDataLoaded = true;
        this.errorDetected = false;
      }
    });

  }
  
  ngOnInit() {
    this.renderList();
  }

  public onRowClicked(article: Article) {
    try {
      var link = new URL(article.url);
      window.open(link, "_blank");
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: this.constants.urlError,
        duration: 2000
      });
    }
  }
}
