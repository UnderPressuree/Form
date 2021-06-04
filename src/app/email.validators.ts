import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class EmailValidators {
  static emailUsed(control: FormControl): Promise<{[key: string]: boolean}> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'test@test.test') {
            resolve({emailUsed: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
