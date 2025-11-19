import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { ProductStore } from '../../../store/product-store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
      <div class="space-y-3 text-lg pt-4">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>\$ {{subtotal()}} </span>

        </div>
      </div>
      <div class="space-y-3 text-lg pt-4">
        <div class="flex justify-between">
          <span>Tax</span>
          <span><!-- \$ --> {{tax() | currency: 'USD'}} </span>
        </div>
      </div>
      <div class="space-y-3 text-lg pt-4 border-t pt-3">
        <div class="flex justify-between">
          <span>Total</span>
          <span><!-- \$ --> {{total() | currency: 'USD'}} </span>
        </div>
      </div>

      <ng-content select="[actionButtons]"></ng-content>

    </div>
  `,
  styles: ``
})
export class SummarizeOrder {
  store = inject(ProductStore);
  subtotal = computed(() => this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
  tax = computed(() => 0.05 * this.subtotal());
  total = computed(() => this.subtotal() - this.tax())
}
