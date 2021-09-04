import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  rateAndAverage: any = {
    ownData: {
      uahPerHour: null,
      averageSalary: null
    },
    packingMachineOperator: {
      uahPerHour: 56.2,
      averageSalary: 14500
    },
    steamTunnelOperator: {
      uahPerHour: 50.1,
      averageSalary: 12924
    },
    assistantSteamTunnelOperator: {
      uahPerHour: 36.4,
      averageSalary: 9500
    },
    meatPreparationOperator: {
      uahPerHour: 50.1,
      averageSalary: 12924
    },
    assistantMeatPreparationOperator: {
      uahPerHour: 34.2,
      averageSalary: 8812
    },
    operatorGravy: {
      uahPerHour: 43,
      averageSalary: 11082
    },
    autoclaveOperator: {
      uahPerHour: 42.6,
      averageSalary: 11000
    },
    assistantAutoclaveOperator: {
      uahPerHour: 34.20,
      averageSalary: 8812
    },
    operatorDana: {
      uahPerHour: 48.6,
      averageSalary: 12533
    },
    operatorSomic: {
      uahPerHour: 48.6,
      averageSalary: 12533
    },
    heaverMeat: {
      uahPerHour: 30.1,
      averageSalary: 7771
    },
    stackerPacker: {
      uahPerHour: 30.1,
      averageSalary: 7771
    },

  }

  calibrateSalary = 1.0077
  constructor() { }

  getUahPerHour(position: string): number {
    return position ? this.rateAndAverage[position].uahPerHour : 0
  }
  getAverageSalary(position: string): number {
    return position ? this.rateAndAverage[position].averageSalary : 0
  }
}
