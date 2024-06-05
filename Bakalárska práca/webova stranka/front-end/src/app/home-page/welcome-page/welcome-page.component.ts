import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private meta: Meta,) {
    this.meta.addTags([
      { name: 'welcome-page:card', content: 'welcome page' },
    ]);
   }

  ngOnInit(): void {
  }

}
