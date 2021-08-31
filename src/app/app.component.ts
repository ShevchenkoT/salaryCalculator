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
  form!: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      position: new FormControl(null, [Validators.required]),
      mainTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      sundayTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      nightTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      weekendTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),
      overTime: new FormControl(null, [Validators.required, Validators.maxLength(3), MyValidators.ifInt]),

      premium: new FormControl(null, [Validators.required, Validators.maxLength(4), MyValidators.ifIntCommaPoint]),
      bonus: new FormControl(null, [Validators.required, Validators.maxLength(4), MyValidators.ifIntCommaPoint]),
      advance: new FormControl(null, [Validators.required, Validators.maxLength(5), MyValidators.ifInt]),
    })
  }
  onSubmit() {
    const newData: mainData = {
      mainTime: +this.form.value.mainTime,
      sundayTime: +this.form.value.sundayTime,
      nightTime: +this.form.value.nightTime,
      weekendTime: +this.form.value.weekendTime,
      overTime: +this.form.value.overTime,

      premium: parseFloat(this.form.value.premium.replace(/[^\d\.\-]/g, ".")),
      bonus: parseFloat(this.form.value.bonus.replace(/[^\d\.\-]/g, ".")),
      advance: this.form.value.advance,
      uahPerHour: this.getUahPerHour(this.form.value.position),
      averageSalary: this.getAverageSalary(this.form.value.position),
    }

    console.log("hello");
    console.log(newData);
  }

  getUahPerHour(position: string): number {


    return 54.2
  }
  getAverageSalary(position: string): number {
    return 6500
  }
}
