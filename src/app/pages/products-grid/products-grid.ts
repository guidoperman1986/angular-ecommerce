import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatListItem, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { RouterLink } from '@angular/router';
import { ProductCard } from "../../components/product-card/product-card";
import { Product } from '../../models/product';
import { ProductStore } from '../../store/product-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg font-bold mb-4">Filters</h2>

          <mat-nav-list>
            @for(cat of categories(); track cat) {
              <mat-list-item 
                class="my-2"  
                [routerLink]="['/products', cat]"
                [activated]="category() === cat"
              >
                <span
                  matListItemTitle
                  [class]="cat === category() ? '!text-white' : ''"
                >
                  {{ cat | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="bg-gray-100 p-6 min-h-[calc(100vh-64px)]">        
        <h1 class="text-2xl font-bold text-gray-900 mb-1">
          {{ category() | titlecase }}
        </h1>

        <p class="text-gray-600 mb-4">
          {{ filteredProducts().length }} products found
        </p>

        <div class="responsive-grid">
          @for(product of filteredProducts(); track product.id) {
            <app-product-card 
              screen="products" 
              [product]="product" 
              (addToCartClicked)="addToCart($event)" 
            >              
            </app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``
})
export class ProductsGrid {
  store = inject(ProductStore);
  category = input<string>('all');

  categories = this.store.categories;
  products = this.store.products;
  filteredProducts = this.store.filteredProducts;

  constructor() {
    this.store.setCategory(this.category);
  }

  addToCart(product: Product) {
    console.log(`Product added to cart: ${product.name}`);
  }


}
