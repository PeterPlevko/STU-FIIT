import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Meta } from '@angular/platform-browser';
import * as L from 'leaflet';
import { tap, catchError, of } from 'rxjs';
import { AddInformationService } from '../services/add-information.service';

export interface UserData {
  _id: string;
  name: string;
  dateOfBirth: string;
  dateOfDeath: string;
  story: string;
}

@Component({
  selector: 'app-deceased-list',
  templateUrl: './deceased-list.component.html',
  styleUrls: ['./deceased-list.component.scss']
})
export class DeceasedListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  soldiers: any = undefined;
  @ViewChild('matMenuTrigger', { read: MatMenuTrigger })
  matMenuTriggerRef!: MatMenuTrigger;
  @ViewChild('matMenuTrigger', { read: MatButton })
  matButtonRef!: MatButton;
  @ViewChildren('menuItems')
  menuItemsRef!: QueryList<MatCheckbox>;
  public triggerButtonText = 'Vyber čo chceš zobraziť';
  public options = [
    { title: 'Predvolené hodnoty', activated: true, value: 'Predvolené hodnoty' },
  ];
  selectedOptions: string[] = [];
  errorMsg: string = '';
  page = 4;

  constructor(
    private meta: Meta,
    private addInformationService: AddInformationService,
  ) {
    this.meta.addTags([
      { name: 'deceased-list:card', content: 'deceased list' },
    ]);
      this.addInformationService
      .getSoldierDefault()
      .pipe(
        tap((soldiers: any) => {
        }),
        catchError((error) => {

          // this.cemeteryForm;
          // // .get('username')!
          // // .setErrors({ badRequest: true, required: true });
          // this.cemeteryForm;
          // .get('password')!
          // .setErrors({ badRequest: true, required: true });
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = `Error: ${error.message}`;
          }
          return of([]);
        })
      )
      .subscribe((soldiers:any) => {

        this.dataSource.data = soldiers}

      );
  }


  ngOnInit(): void {
  }

  public onMenuOpened() {
    this.setFocusOnFirstItem();
    this.triggerButtonText = 'Zavri menu';
  }

  public onMenuClosed() {
    this.dataSource = new MatTableDataSource<any>();
    this.matButtonRef.focus();
    this.triggerButtonText = 'Vyber čo chceš zobraziť';

    if(this.selectedOptions.includes('Predvolené hodnoty')){

      // cemetery

      this.addInformationService
      .getSoldierDefault()
      .pipe(
        tap((soldiers: any) => {
        }),
        catchError((error) => {

          // this.cemeteryForm;
          // // .get('username')!
          // // .setErrors({ badRequest: true, required: true });
          // this.cemeteryForm;
          // .get('password')!
          // .setErrors({ badRequest: true, required: true });
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = `Error: ${error.message}`;
          }
          return of([]);
        })
      )
      .subscribe((soldiers:any) => {

        this.dataSource.data = soldiers}

      );
    }
    else{

        this.addInformationService
          .getSoldierAdded()
          .pipe(
            tap((soldiers: any) => {
              this.soldiers = soldiers;
            }),
            catchError((error) => {
              if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
              } else {
                this.errorMsg = `Error: ${error.message}`;
              }
              return of([]);
            })
          )
          .subscribe((soldiers:any) => {

            this.dataSource.data = soldiers}

          );

    }
  }

  private setFocusOnFirstItem(): void {
    const firstCheckbox = this.menuItemsRef.first;
    firstCheckbox.focus();
    firstCheckbox._elementRef.nativeElement.classList.add(
      'cdk-keyboard-focused'
    );
  }

  public onSelectValue() {
    this.selectedOptions = this.options
      .filter((menuitem) => menuitem.activated)
      .map((menuitem) => menuitem.title);
  }

  private setCheckboxFocus(index: number) {
    const checkBox = this.menuItemsRef.get(index);
    if (checkBox) {
      checkBox.focus();
    }
  }
  public onMenuKeyDown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case 'ArrowUp':
        if (index > 0) {
          this.setCheckboxFocus(index - 1);
        } else {
          this.menuItemsRef.last.focus();
        }
        break;
      case 'ArrowDown':
        if (index !== this.menuItemsRef.length - 1) {
          this.setCheckboxFocus(index + 1);
        } else {
          this.setFocusOnFirstItem();
        }
        break;
      case 'Enter':
        event.preventDefault();
        this.options[index].activated = !this.options[index].activated;
        this.onSelectValue();
        setTimeout(() => this.matMenuTriggerRef.closeMenu(), 200);
        break;
    }
  }

//// pagination
displayedColumns = [ 'name', 'dateOfBirth', 'dateOfDeath', 'story'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

   ngAfterViewInit() {
      if(this.dataSource){

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
  }

  applyFilter(filterValueElement: any) {
    const element = filterValueElement as HTMLInputElement
    let filterValue = element.value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource!.filter = filterValue;
  }
}
