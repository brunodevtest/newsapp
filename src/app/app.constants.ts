import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public apiURL = 'http://localhost:5010/api/Article/GetLatest?page=';
    public appTitle = "News Articles";
    public listTitle = "List of Articles";
    public loading = "Loading...";
    public urlError = "URL not found";
    public error = "Error";
    public search = "Search";
    public emptyList = "No results found for"
}