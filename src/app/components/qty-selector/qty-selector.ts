import { Component, input, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-qty-selector',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center gap-2">
        <button matIconButton [disabled]="quantity() === 1" (click)="qtyUpdate.emit(quantity() - 1)">
          <mat-icon>remove</mat-icon>
        </button>
        <span>{{ quantity() }}</span>
        <button matIconButton (click)="qtyUpdate.emit(quantity() + 1)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export class QtySelector {
  quantity = input(0);
  qtyUpdate = output<number>()
}
