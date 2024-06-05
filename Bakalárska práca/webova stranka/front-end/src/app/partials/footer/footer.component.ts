import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      { name: 'footer:card', content: 'footer' },
    ]);
  }

  ngOnInit(): void {
  }

}
