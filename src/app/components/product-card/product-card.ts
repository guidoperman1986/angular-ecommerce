import { Component, inject, input, output } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product';
import { ProductStore } from '../../store/product-store';
import { ToggleWishlistButton } from "../toggle-wishlist-button/toggle-wishlist-button";
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, ToggleWishlistButton, RouterLink, StarRating],
  template: `
    <div class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
      <img 
        routerLink="/product/{{ product().id }}"
        [src]="product().imageUrl" 
        class="w-full h-[300px] object-cover rounded-t-xl" 
        alt=""
        [style.view-transition-name]="'product-image-'+product().id"
      >

      @if (screen() === 'products') {
        <app-toggle-wishlist-button 
          [product]="product()"
        ></app-toggle-wishlist-button>
      } @else {
        <app-toggle-wishlist-button 
          screen="wishlist" 
          [product]="product()"
        ></app-toggle-wishlist-button>
      }

      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>

        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>
        
        <app-star-rating [rating]="product().rating"> ({{product().reviewsCount }}) </app-star-rating>

        <div class="text-sm font-medium mb-4" 
            [class.text-green-500]="product().inStock" 
            [class.text-red-500]="!product().inStock"
        >
          {{ product().inStock ? 'In Stock' : 'Out of Stock' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-500">
             \${{ product().price.toFixed(2) }}
          </span>  
          <button 
            matButton="filled" 
            class="flex items-center gap-2" 
            (click)="addToCartClicked.emit(product())" 
            [disabled]="!product().inStock"
          >
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>          
  `,
  styles: ``
})
export class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>();
  store = inject(ProductStore);

  screen = input<'products' | 'wishlist'>('products');

}
