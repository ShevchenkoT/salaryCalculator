import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './shared/my.validators';

export interface mainData {
  mainTime: number,
  sundayTime: number,
  nightTime: number,
  weekendTime: number,
  overTime: number,

  premium: number,
  bonus: number,
  advance: number,
  uahPerHour: number,
  averageSalary: number,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  salary = 0
  fullSalary = 0
  newData!: mainData
  form!: FormGroup

  contentDiv!: any
  salaryDiv!: any

  rateAndAverage: any = {
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
      uahPerHour: 0,
      averageSalary: 0
    },
    operatorDana: {
      uahPerHour: 47,
      averageSalary: 12123
    },
    operatorSomic: {
      uahPerHour: 47,
      averageSalary: 12123
    },
    heaverMeat: {
      uahPerHour: 0,
      averageSalary: 0
    },
    stackerPacker: {
      uahPerHour: 30.1,
      averageSalary: 7771
    },

  }
  calibrateSalary = 111.8
  ngOnInit() {
    this.form = new FormGroup({
      position: new FormControl("packingMachineOperator", [Validators.required]),
      mainTime: new FormControl("5", [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      sundayTime: new FormControl("5", [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      nightTime: new FormControl("5", [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      weekendTime: new FormControl("5", [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      overTime: new FormControl("5", [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),

      premium: new FormControl("5", [Validators.required, Validators.maxLength(4), MyValidators.ifIntCommaPoint]),
      bonus: new FormControl("5", [Validators.required, Validators.maxLength(4), MyValidators.ifIntCommaPoint]),
      advance: new FormControl("5", [Validators.required, Validators.maxLength(5), MyValidators.ifInt]),
    })
    this.contentDiv = document.querySelector('#content')
    this.salaryDiv = document.querySelector('#salary')

  }
  onSubmit(): void {
    if (this.form.invalid) {
      return
    }
    this.newData = {
      mainTime: +this.form.value.mainTime,
      sundayTime: +this.form.value.sundayTime,
      nightTime: +this.form.value.nightTime,
      weekendTime: +this.form.value.weekendTime,
      overTime: +this.form.value.overTime,

      premium: parseFloat(this.form.value.premium.replace(/[^\d\.\-]/g, ".")),
      bonus: parseFloat(this.form.value.bonus.replace(/[^\d\.\-]/g, ".")),
      advance: +this.form.value.advance,
      uahPerHour: this.getUahPerHour(this.form.value.position),
      averageSalary: this.getAverageSalary(this.form.value.position),
    }
    this.fullSalary = +this.calculateSalary(this.newData).toFixed(2)
    this.salary = +(this.fullSalary - this.newData.advance).toFixed(2)
    this.salaryDiv.classList.add('pageDown')
    this.contentDiv.classList.add('pageUp')
  }

  getUahPerHour(position: string): number {
    return position ? this.rateAndAverage[position].uahPerHour : 0
  }
  getAverageSalary(position: string): number {
    return position ? this.rateAndAverage[position].averageSalary : 0
  }
  calculateSalary(data: mainData): number {
    const salaryWithoutTax = data.uahPerHour * (data.mainTime + data.sundayTime * 0.5 + data.nightTime * 0.75 + data.weekendTime + data.overTime) +
      0.01 * (data.averageSalary + this.calibrateSalary) * (data.premium + data.bonus)
    const tax = salaryWithoutTax * 0.195
    return salaryWithoutTax - tax
  }
  edit(): void {
    this.salaryDiv.classList.remove('pageDown')
    this.contentDiv.classList.remove('pageUp')
  }
  newEdit(): void {
    this.form.reset()
    this.salaryDiv.classList.remove('pageDown')
    this.contentDiv.classList.remove('pageUp')
  }
}
