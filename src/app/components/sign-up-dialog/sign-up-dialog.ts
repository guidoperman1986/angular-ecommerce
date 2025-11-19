import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { SignUpParams } from '../../models/user';
import { ProductStore } from '../../store/product-store';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatInput, MatPrefix, MatSuffix, ReactiveFormsModule, MatAnchor],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col bg-white rounded-xl">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium self-center">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        
        <button matIconButton class="" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>        
      </div>      

      <form class="mt-3" [formGroup]="signUpForm" (ngSubmit)="signUp()">
        <mat-form-field class="w-full mb-4">
          <input type="text" matInput formControlName="name" placeholder="Enter your name">
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input type="text" matInput formControlName="email" placeholder="Enter your email">
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input type="password" matInput formControlName="password" [type]="passwordVisible() ? 'text' : 'password'" placeholder="Enter your password">
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
          </button>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input type="password" matInput formControlName="confirmPassword" [type]="passwordVisible() ? 'text' : 'password'" placeholder="Enter your password">
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
          </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Create Account</button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
      </p>
    </div>
  `,
  styles: ``
})
export class SignUpDialog {
  store = inject(ProductStore)
  fb = inject(NonNullableFormBuilder);
  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['johnd@test.com', Validators.required],
    password: ['123456', Validators.required],
    confirmPassword: ['123456', Validators.required],
  })
  passwordVisible = signal<boolean>(false);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(DialogRef);
  dialog = inject(MatDialog);

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signUpForm.value;

    this.store.signUp({ email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();

    this.dialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    });
  }

}
