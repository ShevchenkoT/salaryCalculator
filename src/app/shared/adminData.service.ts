import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  rateAndAverage!: any
  calibrateSalary = 1
  constructor() { }

  setRateAndAverage(data: any) {
    this.rateAndAverage = data
  }
  setCalibrateSalary(data: any) {
    this.calibrateSalary = data
  }

  getUahPerHour(position: string): number {
    return position ? this.rateAndAverage[position].uahPerHour : 0
  }
  getAverageSalary(position: string): number {
    return position ? this.rateAndAverage[position].averageSalary : 0
  }

}
