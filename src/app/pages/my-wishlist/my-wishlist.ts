import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ProductCard } from "../../components/product-card/product-card";
import { ProductStore } from '../../store/product-store';
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, EmptyWishlist, MatButton],
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

        <div class="mt-8 flex justify-center">
          <button 
            matButton="outlined"
            class="danger cursor-pointer" 
            (click)="store.clearWishList()"
          >Clear Wishlist</button>
        </div>
      }@else {
        <app-empty-wishlist></app-empty-wishlist>
      }


    </div>
  `,
  styles: ``
})
export class MyWishlist {
  store = inject(ProductStore);
}
