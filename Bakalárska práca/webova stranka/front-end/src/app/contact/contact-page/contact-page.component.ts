import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private meta: Meta,) {
    this.meta.addTags([
      { name: 'contact-page:card', content: 'contact page' },
    ]);
   }

  ngOnInit(): void {
  }

}
