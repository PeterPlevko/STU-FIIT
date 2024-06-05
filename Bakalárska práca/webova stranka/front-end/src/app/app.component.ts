import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Battle field';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, History, BattleField, First world war, memorials, battles, soldiers, war camps, cemeteries, Slovakia,  '},
      {name: 'description', content: 'Website about first world war in Slovakia'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }




}
