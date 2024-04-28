import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { GroupComponent } from './configuration/configuration.component';
import { ArrayComponent } from './array/array.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, GroupComponent, ArrayComponent, JsonPipe],
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
    this.data.set(this.form.getRawValue() as any);
  }
}
