import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [CommonModule, PartialsModule],
})
export class ContactModule {}
