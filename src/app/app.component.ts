import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { GroupComponent } from './configuration/configuration.component';
import { ArrayComponent } from './array/array.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, GroupComponent, ArrayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({});
  data = signal({
    configuration: {
      eventName: 'Name',
      price: 23
    },
    people: [
      {
        name: 'Nicolas',
        age: 12
      },
      {
        name: 'Andrea',
        age: 122
      }
    ]
  });

  constructor() {
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.getRawValue());
  }
}
