import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { catchError, of, tap } from 'rxjs';
import { ConfirmInformationService } from '../services/confirm-information.service';
interface informationType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-confirm-information',
  templateUrl: './confirm-information.component.html',
  styleUrls: ['./confirm-information.component.scss'],
})
export class ConfirmInformationComponent implements OnInit {
  constructor(private confirmInformationService: ConfirmInformationService,
    private meta: Meta,
    ) {
      this.meta.addTags([
        { name: 'confirm-information:card', content: 'confirm information' },
      ]);
    }

  selectedValue: string | undefined;
  informationTypes: informationType[] = [
    { value: 'Cintorín', viewValue: 'Cintorín' },
    { value: 'Boj', viewValue: 'Boj' },
    { value: 'Pamätník', viewValue: 'Pamätník' },
    { value: 'Vojak', viewValue: 'Vojak' },
    { value: 'Zajatecký tábor', viewValue: 'Zajatecký tábor' },
  ];
  ngOnInit(): void {}
}
