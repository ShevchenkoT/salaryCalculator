import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminDataService } from '../shared/adminData.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentPassword = ''

  form!: FormGroup
  constructor(public adminData: AdminDataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      calibrate: new FormControl(this.adminData.calibrateSalary)
    })
    this.form.get('calibrate')?.disable()
  }
  unlockInput() {
    this.form.get('calibrate')?.enable()
  }
  onSubmit() {
    this.adminData.calibrateSalary = this.form.value.calibrate
    this.form.get('calibrate')?.disable()
  }
  login() {
    if (this.checkPassword(this.currentPassword)) {
      console.log("yes");

      const login = document.querySelector('#login')
      login?.remove()

    }
  }
  private checkPassword(pass: string) {
    return pass === '8250' ? true : false
  }
}
