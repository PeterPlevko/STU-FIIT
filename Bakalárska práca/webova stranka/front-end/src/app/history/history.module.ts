import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [HistoryPageComponent],
  imports: [PartialsModule, CommonModule],
})
export class HistoryModule {}
