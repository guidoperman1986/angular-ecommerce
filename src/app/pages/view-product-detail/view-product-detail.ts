import { Component, computed, inject, input } from '@angular/core';
import { ProductStore } from '../../store/product-store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";
import { ViewReviews } from "./view-reviews/view-reviews";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReviews],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" [navigateTo]="backRoute()">Back to Cart</app-back-button>

      @if (store.selectedProduct(); as product) {
        <div class="flex gap-6 mb-8">
          <img 
            [src]="product.imageUrl" 
            alt="" 
            class="w-[500px] h-[500px] object-cover rounded-lg" 
            [style.view-transition-name]="'product-image-'+product.id"
          >

          <div class="flex-1">
            <app-product-info [product]="product"></app-product-info>
          </div>
        </div>
        
        <app-view-reviews [product]="product"></app-view-reviews>
      }
    </div>
  `,
  styles: ``
})
export class ViewProductDetail {
  productId = input.required<string>();
  store = inject(ProductStore);
  backRoute = computed(() => '/products/' + this.store.selectedCategory());

  constructor() {
    this.store.setSelectedProductId(this.productId);
  }
}
