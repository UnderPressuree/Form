import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Observable} from 'rxjs';
import {IResume} from './resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor() { }

  public postResume(resume: IResume): Observable<any> {
    return of(resume);
  }
}
