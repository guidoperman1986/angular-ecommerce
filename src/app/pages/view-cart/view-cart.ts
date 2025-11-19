import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { SummarizeOrder } from "../component/summarize-order/summarize-order";
import { MatAnchor } from "@angular/material/button";
import { ProductStore } from '../../store/product-store';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, MatAnchor],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>
      <h1 class="text-3xl font-extrabold mb-4">Shopping Cart</h1>

      <app-tease-wishlist class="mb-6 block"></app-tease-wishlist>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items></app-list-cart-items>
        </div>

        <div class="lg:col-span-1">
          <app-summarize-order>
            <ng-container actionButtons>
              <button matButton="filled" class="w-full mt-6 py-3" (click)="store.proceedToCheckout()">Proceed to checkout</button>
            </ng-container>
          </app-summarize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ViewCart {
  store = inject(ProductStore)
}
