import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminDataService } from '../shared/adminData.service';
import { mainData } from '../shared/interfaces';
import { MyValidators } from '../shared/my.validators';
import { TodoService } from '../shared/todo.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  deviceInfo!: any;
  newData!: mainData
  form!: FormGroup

  contentDiv!: any
  salaryDiv!: any
  submitted = false
  constructor(private todoService: TodoService, private adminData: AdminDataService) { }
  ngOnInit() {
    this.form = new FormGroup({
      position: new FormControl("ownData", [Validators.required]),
      mainTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      sundayTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      nightTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      weekendTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      overTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      uahPerHour: new FormControl(null, [Validators.required, Validators.maxLength(5), MyValidators.ifIntCommaPoint]),
      averageSalary: new FormControl(null, [Validators.required, Validators.maxLength(5), MyValidators.ifInt]),
      premium: new FormControl(null, [Validators.required, Validators.maxLength(4), MyValidators.ifIntCommaPoint]),
      bonus: new FormControl(null, [Validators.required, Validators.maxLength(5), MyValidators.ifIntCommaPoint]),
      advance: new FormControl(null, [Validators.required, Validators.maxLength(5), MyValidators.ifInt]),
    })
    this.contentDiv = document.querySelector('#content')
    this.salaryDiv = document.querySelector('#salary')

    this.todoService.getCalibrateSalary().subscribe((data) => {
      if (data) {
        this.adminData.setCalibrateSalary(data["calibrateSalary"])
      }
    })
    this.todoService.getRateAndAverage().subscribe((data) => {
      if (data) {
        this.adminData.setRateAndAverage(data)
      }
    })

  }

  onSubmit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.newData = {
      mainTime: +this.form.value.mainTime,
      sundayTime: +this.form.value.sundayTime,
      nightTime: +this.form.value.nightTime,
      weekendTime: +this.form.value.weekendTime,
      overTime: +this.form.value.overTime,

      premium: parseFloat(this.form.value.premium.replace(/[^\d\.\-]/g, ".")),
      bonus: parseFloat(this.form.value.bonus.replace(/[^\d\.\-]/g, ".")),
      advance: +this.form.value.advance,
      uahPerHour: parseFloat(this.form.value.uahPerHour.replace(/[^\d\.\-]/g, ".")),
      averageSalary: +this.form.value.averageSalary,
      position: this.form.value.position,
      date: new Date()
    }
    this.newData.fullSalary = +this.calculateSalary(this.newData).toFixed(2)
    this.newData.salary = +(this.newData.fullSalary - this.newData.advance).toFixed(2)
    this.salaryDiv.classList.add('pageDown')
    this.contentDiv.classList.add('pageUp')
    this.todoService.setSalary(this.newData).subscribe(() => {
      this.submitted = false
      console.log('Done');
    }, () => {
      console.log('Error');
    })
  }


  calculateSalary(data: mainData): number {
    const salaryWithoutTax = data.uahPerHour * (data.mainTime + data.sundayTime * 0.5 + data.nightTime * 0.75 + data.weekendTime + data.overTime) +
      0.01 * (data.averageSalary * this.adminData.calibrateSalary) * (data.premium + data.bonus)
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

  changeData(event: any) {
    this.form.patchValue({ averageSalary: this.adminData.getAverageSalary(event) })
    this.form.patchValue({ uahPerHour: this.adminData.getUahPerHour(event) })
  }

  closeWarning() {
    const warning = document.querySelector('#warning')
    warning?.remove()
  }
}
