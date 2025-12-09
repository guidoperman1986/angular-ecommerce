import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatOption } from '@angular/material/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ViewPanel } from "../../../directives/view-panel";
import { ProductStore } from '../../../store/product-store';
import { AddReviewParams } from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormFieldModule, MatInputModule, MatFormField, MatSelect, ReactiveFormsModule, MatOption, MatLabel, MatAnchor],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">Write a Review</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
        <mat-form-field class="w-md mb-4">
          <mat-label>Review Title</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>        
        <mat-form-field class="w-md mb-4">
          <mat-label>Rating</mat-label>
          <mat-select formControlName="rating">
            @for (option of ratingOptions(); track $index) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <mat-label>Review Comment</mat-label>
          <textarea matInput formControlName="comment"></textarea>
        </mat-form-field>
        <div class="flex gap-4">
          <button matButton="filled" type="submit" [disabled]="store.loading()">
            {{store.loading() ? 'Submitting...' : 'Submit Review'}}
          </button>
          <button matButton="outlined" (click)="store.setWriteReview(false)">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
  host: {
    class: 'block'
  }
})
export class WriteReview {
  ratingOptions = signal([
    { value: 1, label: '1 Star - Terrible' },
    { value: 2, label: '2 Stars - Poor' },
    { value: 3, label: '3 Stars - Average' },
    { value: 4, label: '4 Stars - Good' },
    { value: 5, label: '5 Stars - Excellent' },
  ]);

  fb = inject(NonNullableFormBuilder);
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required]
  });

  store = inject(ProductStore);

  submitReview() {
    if (this.reviewForm.valid) {
      const reviewParams = this.reviewForm.value as AddReviewParams;
      this.store.addReview(reviewParams);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }
}
