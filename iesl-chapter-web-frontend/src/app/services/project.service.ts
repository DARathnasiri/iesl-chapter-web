import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({ 
  providedIn: 'root'
})
export class ProjectService {

  private _url: string = "http://localhost:3000/projects";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this._url);
  }

}
