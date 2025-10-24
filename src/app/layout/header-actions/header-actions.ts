import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { ProductStore } from '../../store/product-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIcon, MatIconButton, MatBadgeModule, RouterLink],
  template: `
    <div class="flex items-center gap-2">
      <button 
        matIconButton 
        routerLink="/wishlist" 
        matBadgePosition="after"
        [matBadge]="store.wishlistCount()"         
        [matBadgeHidden]="store.wishlistCount() === 0"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      
      <button matIconButton routerLink="/cart">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Sign In</button>
      <button matButton="filled">Sign Up</button>
    </div>
  `,
  styles: ``
})
export class HeaderActions {
  store = inject(ProductStore);
}
