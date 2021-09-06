import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminDataService } from '../shared/adminData.service';
import { mainData } from '../shared/interfaces';
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

  }
  unlockInput() {
    this.form.get('calibrate')?.enable()
  }
  onSubmit() {

    this.todoService.setCalibrateSalary(this.form.value.calibrate).subscribe(() => {
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
