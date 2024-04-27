import { Component, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  standalone: true,
  templateUrl: './configuration.component.html',
  imports: [ ReactiveFormsModule ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent {

  container = inject(ControlContainer);
  fb = inject(FormBuilder);
  data = input.required<any>();
  group = this.fb.nonNullable.group({
    eventName: [''],
    price: [0]
  });

  constructor() {
    effect(() => {
      const data = this.data();
      this.patchValue(data);
    })
  }

  get parentForm() {
    if (this.container.control) {
      return this.container.control as FormGroup;
    }
    return null;
  }

  ngOnInit() {
    this.parentForm?.addControl('configuration', this.group);
  }

  patchValue(data: any) {
    this.group.patchValue(data);
  }


}
