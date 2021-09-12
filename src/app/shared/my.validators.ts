import { FormControl } from '@angular/forms';

export class MyValidators {
  static ifInt(control: FormControl): { [key: string]: boolean } {
    if (control.value) {
      return /\D/.test(control.value) ? { isNotInteger: true } : null as any;
    }

    return null as any;
  }

  static ifIntCommaPoint(control: FormControl): { [key: string]: boolean } {
    if (control.value) {
      return !/^[0-9]{1,2}([,.][0-9]{1,2})?$/.test(control.value) ? { isNotInteger: true } : null as any;
    }
    return null as any;
  }

  static ifFloat(control: FormControl): { [key: string]: boolean } {
    if (control.value) {
      return !/^[0-9]{1,2}([.][0-9]{1,2})?$/.test(control.value) ? { isNotInteger: true } : null as any;
    }
    return null as any;
  }

}


