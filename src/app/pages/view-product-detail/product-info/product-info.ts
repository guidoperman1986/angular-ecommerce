import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from "../stock-status/stock-status";
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { ProductStore } from '../../../store/product-store';
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, MatAnchor, MatButton, MatIcon, ToggleWishlistButton, MatIconButton],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{ product().name }}</h1>
    <h1 class="text-3xl font-extrabold mb-3">{{ product().price.toFixed(2) }}</h1>
    <app-stock-status
      class="mb-3"
      [inStock]="product().inStock"
    ></app-stock-status>
    <p class="font-semibold mb-2">Description</p>
    <p class="text-gray-600 border-b border-gray-200 pb-4">{{product().description}}</p>

    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantity:</span>
      <app-qty-selector [quantity]="quantity()" (qtyUpdate)="quantity.set($event)"></app-qty-selector>
    </div>

    <div class="relative flex items-center gap-4 mb border-b border-gray-200 pb-4">
      <button
        matButton="filled"
        class="w-2/3 flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>
        {{product().inStock ? 'Add to Cart' : 'Out of Stock'}}
      </button>

      <app-toggle-wishlist-button [product]="product()" />

      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>

    </div>
    <div class="pt-6 flex gap-3 items-center text-gray-700 text-xs">
      <mat-icon class="small">local_shipping</mat-icon>
      <span>Free shipping on orders over $50</span>
    </div>

    <div class="flex gap-3 items-center text-gray-700 text-xs">
      <mat-icon class="small">autorenew</mat-icon>
      <span>30-day return policy</span>
    </div>
    <div class="flex gap-3 items-center text-gray-700 text-xs">
      <mat-icon class="small">shield</mat-icon>
      <span>2-year warranty included</span>
    </div>
    
  `,
  styles: ``
})
export class ProductInfo {
  store = inject(ProductStore);
  product = input.required<Product>();
  quantity = signal<number>(1);
}
