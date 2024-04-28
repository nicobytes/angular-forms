import { ChangeDetectionStrategy, Component, effect, inject, input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-array',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './array.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayComponent {
  container = inject(ControlContainer);
  changeDetector = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  data = input.required<any[]>();
  peopleField = new FormArray<FormGroup<{name: FormControl<string>, age: FormControl<number>}>>([]);

  constructor() {
    effect(() => {
      const data = this.data();
      this.patchValue(data);
    });
  }

  ngOnInit() {
    this.parentForm?.addControl('people', this.peopleField);

    this.parentForm?.get('configuration')?.get('price')?.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe(value => {
      console.log(value);
    })
  }

  get parentForm() {
    if (this.container.control) {
      return this.container.control as FormGroup;
    }
    return null;
  }

  patchValue(data: any[]) {
    console.log('update array');
    this.peopleField.clear();
    if (data.length === 0) {
      this.peopleField.push(this.createPersonGroup());
    } else {
      data.forEach((item) => {
        this.peopleField.push(this.createPersonGroup(item));
      })
    }
    this.changeDetector.detectChanges();
  }

  createPersonGroup(data?: any) {
    return this.fb.nonNullable.group({
      name: [data?.name ?? ''],
      age: [data?.age ?? 0]
    })
  }

  addPerson() {
    this.peopleField.push(this.createPersonGroup());
  }
}
