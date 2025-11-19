import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { ProductStore } from '../../store/product-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatDivider } from "@angular/material/divider";
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIcon, MatIconButton, MatBadgeModule, RouterLink, MatMenu, MatMenuTrigger, MatDivider],
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
      
      <button 
        matIconButton 
        routerLink="/cart"
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>

      @if (store.user(); as user) {
        <button matIconButton [matMenuTriggerFor]="userMenu">
          <img [src]="user?.imageUrl" [alt]="user.name" class="w-8 h-8 rounded-full">
        </button>

        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 mix-w-[200px]">
            <span class="text-sm font-medium">{{user.name}}</span>
            <span class="text-xs text-gray-500">{{user.email}}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="!min-h-[32px] flex items-center ml-3" mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon>
            Sign Out
          </button>
        </mat-menu>


      } @else {
        <button (click)="openSignInDialog()" matButton>Sign In</button>
        <button (click)="openSignUpDialog()" matButton="filled">Sign Up</button>
      }

    </div>
  `,
  styles: ``
})
export class HeaderActions {
  store = inject(ProductStore);
  dialog = inject(MatDialog);

  openSignUpDialog() {
    this.dialog.open(SignUpDialog, {
      disableClose: true
    })
  }
  
  openSignInDialog() {
    this.dialog.open(SignInDialog, {
      disableClose: true
    })
  }
}
