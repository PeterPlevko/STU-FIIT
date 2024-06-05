import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

interface informationType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-information-form',
  templateUrl: './add-information-form.component.html',
  styleUrls: ['./add-information-form.component.scss'],
})
export class AddInformationFormComponent implements OnInit {
  constructor(private meta: Meta,) {
    this.meta.addTags([
      { name: 'add-information:card', content: 'add information' },
    ]);
  }
  selectedValue: string | undefined;
  informationTypes: informationType[] = [
    { value: 'Cintorín', viewValue: 'Cintorín' },
    { value: 'Boj', viewValue: 'Boj' },
    { value: 'Pamätník', viewValue: 'Pamätník' },
    { value: 'Zajatecký tábor', viewValue: 'Zajatecký tábor' },
    { value: 'Vojak', viewValue: 'Vojak' },
  ];

  ngOnInit(): void {}
}
