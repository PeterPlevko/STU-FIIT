// table taken from https://github.com/marinantonio/angular-mat-table-crud
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
  selector: 'app-change-cemetery',
  templateUrl: './change-cemetery.component.html',
  styleUrls: ['./change-cemetery.component.scss']
})

export class ChangeCemeteryComponent   implements OnInit {
  displayedColumns = ['_id', 'GPS', 'cemeteryType', 'nationality', 'dateOfDeath', 'reasonOfDeath', 'numberOfGraves', 'numberOfBurried', 'addedBy',  'state', 'actions'];
  exampleDatabase!: DataService;
  dataSource!: ExampleDataSource;
  index!: number;
  id!: string;
  errorMsg!: string;

  constructor(public httpClient: HttpClient,
              public notificationService: NotificationService,
              private appStateService: AppStateService,
              public dialog: MatDialog,
              private meta: Meta,
              public dataService: DataService) {
                this.meta.addTags([
                  { name: 'change-cemetery:card', content: 'change cemetery' },
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


        if(isNaN(parseInt(this.dataService.getDialogData().numberOfBurried))){

          this.dataService.getDialogData().numberOfBurried = null;
        }

        if(isNaN(parseInt(this.dataService.getDialogData().numberOfGraves))){

          this.dataService.getDialogData().numberOfGraves = null;
        }
        // removes empty string from array and makes the array empty

        if(this.dataService.getDialogData().reasonOfDeath === undefined || this.dataService.getDialogData().reasonOfDeath[0] === ''){
          this.dataService.getDialogData().reasonOfDeath = []
        }

        if(this.dataService.getDialogData().nationality === undefined || this.dataService.getDialogData().nationality[0] === ''){
          this.dataService.getDialogData().nationality = []
        }

        if(this.dataService.getDialogData().dateOfDeath === undefined || this.dataService.getDialogData().dateOfDeath[0] === ''){
          this.dataService.getDialogData().dateOfDeath = []
        }

        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().reasonOfDeath) === "string"){
          this.dataService.getDialogData().reasonOfDeath = this.dataService.getDialogData().reasonOfDeath.split(",");
        }
        // if user changed nationality
        if(typeof(this.dataService.getDialogData().nationality) === "string"){
          this.dataService.getDialogData().nationality = this.dataService.getDialogData().nationality.split(",");
        }
        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().dateOfDeath) === "string"){
          this.dataService.getDialogData().dateOfDeath = this.dataService.getDialogData().dateOfDeath.split(",");
        }

        this.dataService
        .addIssue(this.dataService.getDialogData())
        .pipe(
          tap((response: any) => {

            delete response.__v;

            this.exampleDatabase.dataChange.value.push(response);
            this.refreshTable();
            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne pridaný`);
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
        .subscribe();


      }
    });
  }

  startEdit(i: number, _id: string, GPS: string, addedBy: string, cemeteryType: string, dateOfDeath: string, nationality: string, numberOfBurried: string, numberOfGraves: string, reasonOfDeath: string, state: string) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {_id: _id, GPS: GPS, cemeteryType: cemeteryType, dateOfDeath: dateOfDeath, nationality: nationality, numberOfBurried: numberOfBurried, numberOfGraves: numberOfGraves , reasonOfDeath: reasonOfDeath , state: state, addedBy:addedBy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase!.dataChange.value.findIndex((x: { _id: string; }) => x._id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();



        if(isNaN(parseInt(this.dataService.getDialogData().numberOfBurried))){

          this.dataService.getDialogData().numberOfBurried = null;
        }

        if(isNaN(parseInt(this.dataService.getDialogData().numberOfGraves))){

          this.dataService.getDialogData().numberOfGraves = null;
        }
        // removes empty string from array and makes the array empty

        if(this.dataService.getDialogData().reasonOfDeath === undefined || this.dataService.getDialogData().reasonOfDeath[0] === ''){
          this.dataService.getDialogData().reasonOfDeath = []
        }

        if(this.dataService.getDialogData().nationality === undefined || this.dataService.getDialogData().nationality[0] === ''){
          this.dataService.getDialogData().nationality = []
        }

        if(this.dataService.getDialogData().dateOfDeath === undefined || this.dataService.getDialogData().dateOfDeath[0] === ''){
          this.dataService.getDialogData().dateOfDeath = []
        }

        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().reasonOfDeath) === "string"){
          this.dataService.getDialogData().reasonOfDeath = this.dataService.getDialogData().reasonOfDeath.split(",");
        }
        // if user changed nationality
        if(typeof(this.dataService.getDialogData().nationality) === "string"){
          this.dataService.getDialogData().nationality = this.dataService.getDialogData().nationality.split(",");
        }
        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().dateOfDeath) === "string"){
          this.dataService.getDialogData().dateOfDeath = this.dataService.getDialogData().dateOfDeath.split(",");
        }

        // And lastly refresh table



        this.dataService
        .updateIssueBackend(this.dataService.getDialogData())
        .pipe(
          tap((response: any) => {
            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne zmenený`);
            this.refreshTable();

            // this.router.navigate(['/'], {
            //   queryParams: { logged: 'true' },
            // });
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
            // this.router.navigate(['/'], {
            //   queryParams: { logged: 'true' },
            // });
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
          const searchStr = (issue._id + issue.GPS + issue.addedBy + issue.cemeteryType + issue.reasonOfDeath + issue.dateOfDeath + issue.numberOfBurried + issue.numberOfGraves + issue.nationality + issue.state).toLowerCase();
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
        case 'cemeteryType': [propertyA, propertyB] = [a.cemeteryType, b.cemeteryType]; break;
        case 'numberOfBurried': [propertyA, propertyB] = [a.numberOfBurried, b.numberOfBurried]; break;
        case 'numberOfGraves': [propertyA, propertyB] = [a.numberOfGraves, b.numberOfGraves]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
        case 'nationality': [propertyA, propertyB] = [a.nationality, b.nationality]; break;
        case 'dateOfDeath': [propertyA, propertyB] = [a.dateOfDeath, b.dateOfDeath]; break;
        case 'reasonOfDeath': [propertyA, propertyB] = [a.reasonOfDeath, b.reasonOfDeath]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
