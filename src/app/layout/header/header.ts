import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderActions } from "../header-actions/header-actions";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, RouterLink],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200px] mx-auto w-full flex items-center gap-4 cursor-pointer" routerLink="/">
        <span>Modern Store</span>
      </div>
      <app-header-actions />
    </mat-toolbar>
  `
})
export class Header {

}
