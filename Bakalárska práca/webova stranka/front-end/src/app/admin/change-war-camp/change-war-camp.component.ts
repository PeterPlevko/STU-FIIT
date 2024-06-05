import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Issue} from './models/issue';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-change-war-camp',
  templateUrl: './change-war-camp.component.html',
  styleUrls: ['./change-war-camp.component.scss']
})

export class ChangeWarCampComponent    implements OnInit {
  displayedColumns = ['_id', 'GPS', 'campType', 'equipment', 'mainCaptiveNationality', 'numberOfCaptives', 'addedBy', 'state', 'actions'];
  exampleDatabase!: DataService;
  dataSource!: ExampleDataSource;
  index!: number;
  id!: string;
  errorMsg!: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private meta: Meta,
              public notificationService: NotificationService,
              private appStateService: AppStateService,
              public dataService: DataService) {
                this.meta.addTags([
                  { name: 'change-war-camp:card', content: 'change war camp' },
                ]);
              }


  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: Issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        // if user input is empty change string into array
        if(this.dataService.getDialogData().equipment === undefined || this.dataService.getDialogData().equipment[0] === '' ){
          this.dataService.getDialogData().equipment = []
        }

        if(typeof(this.dataService.getDialogData().equipment) === "string"){
          this.dataService.getDialogData().equipment = this.dataService.getDialogData().equipment.split(",");
        }

        if(isNaN(parseInt(this.dataService.getDialogData().numberOfCaptives))){
          this.dataService.getDialogData().numberOfCaptives = null;
        }

        this.dataService
        .addIssue(this.dataService.getDialogData())
        .pipe(
          tap((response: any) => {
            // this.notificationService.success('Boj bol úspešne odstránený');
            delete response.__v;
            this.exampleDatabase.dataChange.value.push(response);
            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne pridaný`);
            this.refreshTable();
          }),
          catchError((error) => {
            // this.memorialForm
            //   .get('username')!
            //   .setErrors({ badRequest: true, required: true });
            // this.memorialForm
            //   .get('password')!
            //   .setErrors({ badRequest: true, required: true });
            if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
            } else {
              this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
          })
        )
        .subscribe();

      }
    });
  }

  startEdit(i: number, _id: string, GPS: string, addedBy: string, campType: string, equipment: string, mainCaptiveNationality: string, numberOfCaptives: string, state: string) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {_id: _id, GPS: GPS, campType: campType, equipment: equipment, mainCaptiveNationality: mainCaptiveNationality, numberOfCaptives: numberOfCaptives, state: state, addedBy:addedBy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase!.dataChange.value.findIndex((x: { _id: string; }) => x._id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();

        // if user input is empty change string into array
        if(this.dataService.getDialogData().equipment === undefined || this.dataService.getDialogData().equipment[0] === '' ){
          this.dataService.getDialogData().equipment = []
        }

        // if user changed equipment
        if(typeof(this.dataService.getDialogData().equipment) === "string"){
          this.dataService.getDialogData().equipment = this.dataService.getDialogData().equipment.split(",");
        }

        if(isNaN(parseInt(this.dataService.getDialogData().numberOfCaptives))){
          this.dataService.getDialogData().numberOfCaptives = null;
        }

        // And lastly refresh table


        this.dataService
        .updateIssueBackend(this.dataService.getDialogData())
        .pipe(
          tap((response: any) => {

            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne zmenený`);
            this.refreshTable();
          }),
          catchError((error) => {
            // this.memorialForm
            //   .get('username')!
            //   .setErrors({ badRequest: true, required: true });
            // this.memorialForm
            //   .get('password')!
            //   .setErrors({ badRequest: true, required: true });
            if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
            } else {
              this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
          })
        )
        .subscribe();


      }

    });
  }
  deleteItem(i: number, _id: string, GPS: string, addedBy: string, cemeteryType: string, dateOfDeath: string, nationality: string, numberOfBurried: string, numberOfGraves: string, reasonOfDeath: string, state: string) {
    this.index = i;
    this.id = _id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {_id: _id, GPS: GPS, cemeteryType: cemeteryType, dateOfDeath: dateOfDeath, nationality: nationality, numberOfBurried: numberOfBurried, numberOfGraves: numberOfGraves , reasonOfDeath: reasonOfDeath , state: state, addedBy:addedBy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase!.dataChange.value.findIndex((x: { _id: string; }) => x._id === this.id);

        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase!.dataChange.value.splice(foundIndex, 1);


        this.dataService
        .deleteIssue(_id)
        .pipe(
          tap((response: any) => {
            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne odstránený`);
            this.refreshTable();
          }),
          catchError((error) => {
            // this.memorialForm
            //   .get('username')!
            //   .setErrors({ badRequest: true, required: true });
            // this.memorialForm
            //   .get('password')!
            //   .setErrors({ badRequest: true, required: true });
            if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
            } else {
              this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
          })
        )
        .subscribe();

      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient, this.appStateService) ;
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
          const searchStr = (issue.GPS + issue.addedBy + issue.campType + issue.equipment + issue.mainCaptiveNationality + issue.numberOfCaptives + issue.state + issue._id).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'GPS': [propertyA, propertyB] = [a.GPS, b.GPS]; break;
        case 'addedBy': [propertyA, propertyB] = [a.addedBy, b.addedBy]; break;
        case 'campType': [propertyA, propertyB] = [a.campType, b.campType]; break;
        case 'equipment': [propertyA, propertyB] = [a.equipment, b.equipment]; break;
        case 'mainCaptiveNationality': [propertyA, propertyB] = [a.mainCaptiveNationality, b.mainCaptiveNationality]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
        case 'numberOfCaptives': [propertyA, propertyB] = [a.numberOfCaptives, b.numberOfCaptives]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
