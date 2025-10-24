import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ProductStore } from '../../store/product-store';
import { JsonPipe } from '@angular/common';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue shopping</app-back-button>

      @if (store.wishlistCount() > 0) {
        <div class="flex justify-between mb-6 items-center">
          <h1 class="text-2xl font-bold">My Wishlist</h1>
          <span class="text-gray-500 text-xl">{{store.wishlistCount()}} items</span>
        </div>
        
        <div class="responsive-grid">
          @for (product of store.wishlistItems(); track product.id){
            <app-product-card 
              [product]="product"
              screen="wishlist"
            ></app-product-card>
          }
        </div>
      }@else {}


    </div>
  `,
  styles: ``
})
export class MyWishlist {
  store = inject(ProductStore);
}
