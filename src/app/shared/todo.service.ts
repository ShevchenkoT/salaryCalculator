import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { mainData } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  setSalary(newSalary: mainData): Observable<any> {
    return this.http.post(`${environment.rbDbUrl}/salary.json`, newSalary)
  }
  getCalibrateSalary(): Observable<any> {
    return this.http.get(`${environment.rbDbUrl}/calibrate.json`)
  }
  getRateAndAverage(): Observable<any> {
    return this.http.get(`${environment.rbDbUrl}/rateAndAverage.json`)
  }
  updateRateAndAverage(data: any) {
    return this.http.patch(`${environment.rbDbUrl}/rateAndAverage.json`, data)
  }

  setCalibrateSalary(data: any): Observable<any> {
    console.log(data);
    const newData = {
      "calibrateSalary": +data
    }
    return this.http.patch(`${environment.rbDbUrl}/calibrate.json`, newData)
  }
  getAllSalary(): Observable<any> {
    return this.http.get(`${environment.rbDbUrl}/salary.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map((key) => ({
              ...response[key],
              id: key,
            }));
        })
      );
  }
  removeSalary(id: any): Observable<any> {
    return this.http.delete(`${environment.rbDbUrl}/salary/${id}.json`)
  }


}
