import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'success-notification',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between center">
      <mat-icon style="color: #00d45a; vertical-align: bottom;">
        check
      </mat-icon>
      <i
        style="padding: 0 10px; text-align: center;"
        [innerHtml]="data.message"
      >
        {{ data.message }}
      </i>
      <mat-icon
        style="vertical-align: bottom; cursor: pointer;"
        (click)="dismiss()"
      >
        highlight_off
      </mat-icon>
    </div>
  `,
})
export class SuccessNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  dismiss() {
    this.data.preClose();
  }
}
