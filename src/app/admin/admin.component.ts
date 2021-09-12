import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminDataService } from '../shared/adminData.service';
import { mainData } from '../shared/interfaces';
import { MyValidators } from '../shared/my.validators';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentPassword = ''
  allSalary!: Array<mainData>
  form!: FormGroup
  rateAndAverageForm!: FormGroup
  rateAndAverage!: Array<any>
  submitted = false
  calibrateValueIsChanged = ''
  rateAndAverageIsChanged = ''

  constructor(public adminData: AdminDataService, private todoService: TodoService) { }

  ngOnInit() {

    this.form = new FormGroup({
      calibrate: new FormControl(this.adminData.calibrateSalary)
    })

    this.form.get('calibrate')?.disable()
    this.todoService.getCalibrateSalary().subscribe((data) => {
      if (data) {
        this.adminData.setCalibrateSalary(data["calibrateSalary"])
        this.adminData.calibrateSalary = data["calibrateSalary"]
        this.form.patchValue({ calibrate: data["calibrateSalary"] })
      }
    })
    this.todoService.getAllSalary().subscribe((allSalary: any) => {
      this.allSalary = allSalary
    })
    this.todoService.getRateAndAverage().subscribe((rateAndAverage) => {
      this.rateAndAverage = rateAndAverage

    }, null, (() => {
      this.rateAndAverageForm = new FormGroup({
        rateSalary: new FormArray([]),
        averageSalary: new FormArray([]),
      })
      const obj: { [index: string]: any } = this.rateAndAverage;

      Object.keys(obj as object).map((key: string) => {
        this.addFeature(obj[key].averageSalary.toString(), obj[key].uahPerHour.toString());
      });

    }))


  }

  saveChanges(): void {
    this.submitted = true
    const newObject: { [k: string]: any } = {};
    this.getAllPosition().map((position, idx) => {
      newObject[`${position}`] = {
        "averageSalary": this.rateAndAverageForm.value.rateSalary[idx],
        "uahPerHour": this.rateAndAverageForm.value.averageSalary[idx],
      }
    })
    this.todoService.updateRateAndAverage(newObject).subscribe(() => {
      this.rateAndAverageIsChanged = 'Зміни збережено'
      setTimeout(() => {
        this.rateAndAverageIsChanged = ''
      }, 4000)
      this.submitted = false
    }, () => {
      this.rateAndAverageIsChanged = 'Трапилась помилка'
      setTimeout(() => {
        this.rateAndAverageIsChanged = ''
      }, 4000)
    })

  }
  getAllPosition(): Array<String> {
    return Object.keys(this.rateAndAverage).map((key) => key)
  }

  addFeature(chaName: string = '', chaInfo: string = ''): void {
    const newRateSalary = new FormControl(chaName, [Validators.required, MyValidators.ifInt]);
    const newAverageSalary = new FormControl(chaInfo, [Validators.required, MyValidators.ifFloat]);

    (this.rateAndAverageForm.get('rateSalary') as FormArray).push(newRateSalary);
    (this.rateAndAverageForm.get('averageSalary') as FormArray).push(newAverageSalary);
  }
  getRateSalary(): Array<any> {
    return (this.rateAndAverageForm.get('rateSalary') as FormArray).controls;
  }
  getAverageSalary(): Array<any> {
    return (this.rateAndAverageForm.get('averageSalary') as FormArray).controls;
  }



  arrayFormErrors(): boolean {
    return !!this.getRateSalary().filter((obj) => obj.errors).length ||
      !!this.getAverageSalary().filter((obj) => obj.errors).length;
  }
  arrayFormValid(): boolean {
    return !!this.getRateSalary()
      .filter(
        (obj) => obj.invalid && obj.touched
      ).length
      || !!this.getAverageSalary()
        .filter(
          (obj) => obj.invalid && obj.touched
        ).length;
  }





  unlockInput() {
    this.form.get('calibrate')?.enable()
  }



  onSubmit() {
    this.todoService.setCalibrateSalary(this.form.value.calibrate).subscribe(() => {
      this.calibrateValueIsChanged = 'Зміни збережено'
      setTimeout(() => {
        this.calibrateValueIsChanged = ''
      }, 4000)
    }, () => {
      this.calibrateValueIsChanged = 'Трапилась помилка'
      setTimeout(() => {
        this.calibrateValueIsChanged = ''
      }, 4000)
    })
    this.adminData.calibrateSalary = this.form.value.calibrate
    this.form.get('calibrate')?.disable()

  }
  login() {
    if (this.checkPassword(this.currentPassword)) {
      const login = document.querySelector('#login')
      login?.remove()
    }
  }
  private checkPassword(pass: string) {
    return pass === '8250' ? true : false
  }
  removeData(id: string | undefined) {
    if (id) {
      this.todoService.removeSalary(id).subscribe(() => {
        this.allSalary = this.allSalary.filter((s) => s.id !== id).reverse()
      })
    }
  }


}
