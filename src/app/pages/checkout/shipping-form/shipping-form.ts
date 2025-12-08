import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInput } from '@angular/material/input';
import { ViewPanel } from "../../../directives/view-panel";

@Component({
  selector: 'app-shipping-form',
  imports: [
    ViewPanel,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Shipping Information
      </h2>
      <form 
        [formGroup]="shippingForm" 
        class="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <mat-form-field>
          <mat-label>First Name</mat-label>
          <input 
            type="text" 
            matInput 
            placeholder="First Name"
            formControlName="firstName"
            name="firstName"
          >
        </mat-form-field>
        <mat-form-field>
          <mat-label>Last Name</mat-label>
          <input 
            type="text" 
            matInput 
            placeholder="Last Name"
            formControlName="lastName"
            name="lastName"
          >
        </mat-form-field>
        
        <mat-form-field class="col-span-2">
          <mat-label>Address</mat-label>
          <textarea 
            matInput 
            placeholder="Address"
            formControlName="address"
            name="address"
          ></textarea>
        </mat-form-field>

        
        <mat-form-field>
          <mat-label>City</mat-label>
          <input 
            type="text" 
            matInput 
            placeholder="City"
            formControlName="city"
            name="city"
          >
        </mat-form-field>
        <mat-form-field>
          <mat-label>State</mat-label>
          <input 
            type="text" 
            matInput 
            placeholder="State"
            formControlName="state"
            name="state"
          >
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <mat-label>Zip Code</mat-label>
          <input
            type="text" 
            matInput 
            placeholder="Zip Code"
            formControlName="zipCode"
            name="zipCode"
          >
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``
})
export class ShippingForm {
  fb = inject(FormBuilder);
  shippingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required]
  });
}
