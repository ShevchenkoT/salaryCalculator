import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mainData } from '../main/main.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushSalaryService {

  constructor(private http: HttpClient) { }

  setSalary(newSalary: mainData): Observable<any> {
    return this.http.post(`${environment.rbDbUrl}/salary.json`, newSalary)
  }
}
