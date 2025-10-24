import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductStore } from '../../store/product-store';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  template: `
  @if (screen() === 'products') {
    <button 
      class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full !bg-white border-0 shadowd-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 small"
      matIconButton
      [class]="isInWhishlist() ? 'text-red-500' : 'text-gray-400'"
      (click)="toggleWishlist(product())"
    >
      <mat-icon>{{isInWhishlist() ? 'favorite' : 'favorite_border'}}</mat-icon>
    </button>
  } @else {
    <button 
      class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full !bg-white border-0 shadowd-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
      matIconButton
      (click)="store.removeFromWishlist(product().id)"
    >
      <mat-icon>delete</mat-icon>
    </button>
  }
  `,
  styles: ``
})
export class ToggleWishlistButton {
  product = input.required<Product>();
  store = inject(ProductStore);
  isInWhishlist = computed(() => this.store.wishlistItems().find(item => item.id === this.product().id));
  screen = input<'products' | 'wishlist'>('products');

  toggleWishlist(product: Product) {
    if (this.isInWhishlist()) {
      this.store.removeFromWishlist(product.id);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
