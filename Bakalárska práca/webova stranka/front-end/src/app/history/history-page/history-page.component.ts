import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  constructor(private meta: Meta,
    ) {
      this.meta.addTags([
        { name: 'history-page:card', content: 'history page' },
      ]);
     }

  ngOnInit(): void {
  }

}
