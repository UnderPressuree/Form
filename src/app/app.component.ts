import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailValidators} from './email.validators';
import {IFramework} from './framework.model';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ResumeService} from './resume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public form: FormGroup;
  public frameworks: IFramework[] = [];
  public chosenFramework: IFramework;
  private unsubscribe: Subject<void> = new Subject<void>();
  public hobbyForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      framework: ['', [Validators.required]],
      frameworkVersion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailValidators.emailUsed]],
      hobby: this.fb.array([])
    });
    this.hobbyForm = this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
    this.frameworks = [
      {
        name: 'angular',
        versions: ['1.1.1', '1.2.1', '1.3.3']
      },
      {
        name: 'react',
        versions: ['2.1.2', '3.2.4', '4.3.1']
      },
      {
        name: 'vue',
        versions: ['3.3.1', '5.2.1', '5.1.3']
      }
    ];
  }

  ngOnInit(): void {
    this.framework.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.chosenFramework = this.getChosenFramework();
      this.frameworkVersion.reset();
    });
  }

  get firstName(): FormControl {
      return this.form.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }
  get dateOfBirth(): FormControl {
    return this.form.get('dateOfBirth') as FormControl;
  }
  get framework(): FormControl {
    return this.form.get('framework') as FormControl;
  }
  get frameworkVersion(): FormControl {
    return this.form.get('frameworkVersion') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get hobbyArray(): FormArray {
    return this.form.get('hobby') as FormArray;
  }

  get hobbyControls(): FormGroup[] {
    return this.hobbyArray.controls as FormGroup[];
  }


  get hobbyName(): FormControl {
    return this.hobbyForm.get('name') as FormControl;
  }

  get duration(): FormControl {
    return this.hobbyForm.get('duration') as FormControl;
  }

  public sendForm(): void {
    if (!this.hobbyArray.length) {
      this.form.setErrors({noHobby: true});
      return;
    }
    if (this.form.valid) {
      this.resumeService.postResume(this.form.value).pipe(take(1)).subscribe((resume) => {
        console.log(this.form.value);
        this.form.reset();
      });
    }
  }

  private getChosenFramework(): IFramework {
    return (this.framework.value) ? this.frameworks.find(f => f.name === this.framework.value) : null;
  }

  public addHobby(): void {
    if (this.hobbyForm.valid) {
      this.hobbyArray.push(
        this.fb.group({
          name: [this.hobbyName.value, [Validators.required]],
          duration: [this.duration.value, [Validators.required]]
        })
      );
      this.hobbyForm.reset();
    }
  }

  public removeHobby(index: number): void {
    this.hobbyArray.removeAt(index);
  }

  public show(h): void {
    console.log(this.hobbyArray.value);
    console.log(h);
  }
}
