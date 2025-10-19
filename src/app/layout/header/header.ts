import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderActions } from "../header-actions/header-actions";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200px] mx-auto w-full flex items-center gap-4">
        <span>Modern Store</span>
      </div>
      <app-header-actions />
    </mat-toolbar>
  `
})
export class Header {

}
