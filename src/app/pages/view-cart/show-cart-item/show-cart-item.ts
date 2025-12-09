import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { ProductStore } from '../../../store/product-store';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIconButton, MatIcon],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img 
          [src]="item().product.imageUrl" 
          class="w-24 h-24 rounded-lg object-cover" 
          alt=""
          [style.view-transition-name]="'product-image-'+item().product.id"
        >
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{item().product.name}}</div>
          <div class="text-gray-600 text-lg">\${{item().product.price}}</div>
        </div>
      </div>

      <app-qty-selector [quantity]="item().quantity" (qtyUpdate)="updateQuantity($event)"></app-qty-selector>

      <div class="flex flex-col items-end">
        <div class="text-right font-semibold text-lg"> {{total()}} </div>
        <div class="flex -me-3">
          <button 
            matIconButton 
            (click)="store.moveToWishlist(item().product)"
          >
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button 
            matIconButton 
            class="danger" 
            (click)="store.deleteFromCart(item().product.id)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>

    </div>
  `,
  styles: ``
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(ProductStore);
  total = computed(() => this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0));

  updateQuantity(quantity: number) {
    console.log(quantity);
    this.store.setItemQuantity({ productId: this.item().product.id, quantity })
  }
}
