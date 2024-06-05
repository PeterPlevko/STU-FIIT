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
import { ShowImageDialogComponent } from './dialogs/showImage/showImage.dialog.component';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-change-memorial',
  templateUrl: './change-memorial.component.html',
  styleUrls: ['./change-memorial.component.scss']
})

export class ChangeMemorialComponent implements OnInit {
  displayedColumns = ['_id', 'GPS', 'name',   'location', 'municipalityDescription', 'deceasedList', 'dateOfBirth', 'dateOfDeath' , 'photoDescription',  'imagePath' ,       'addedBy',  'state',   'actions'];
  exampleDatabase!: DataService;
  dataSource!: ExampleDataSource;
  index!: number;
  id!: string;
  errorMsg!: string;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private meta: Meta,
              private appStateService: AppStateService,
              public notificationService: NotificationService,
              public dataService: DataService) {
                this.meta.addTags([
                  { name: 'change-memorial:card', content: 'change memorial' },
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

   showImage(imagePath: any){

    this.dataService.getImage(imagePath).subscribe(
       async (data) => {
         const value =  this.createImageFromBlob(data);

      },
      (error) => {
        console.log(error);
      }
    );


  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: Issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        // removes empty string from array and makes the array empty

        if(this.dataService.getDialogData().deceasedList === undefined || this.dataService.getDialogData().deceasedList[0] === '' ){
          this.dataService.getDialogData().deceasedList = []
        }

        if(this.dataService.getDialogData().dateOfBirth === undefined || this.dataService.getDialogData().dateOfBirth[0] === ''){
          this.dataService.getDialogData().dateOfBirth = []
        }

        if(this.dataService.getDialogData().dateOfDeath === undefined || this.dataService.getDialogData().dateOfDeath[0] === ''){
          this.dataService.getDialogData().dateOfDeath = []
        }

        // if user changed reason of deceasedList
        if(typeof(this.dataService.getDialogData().deceasedList) === "string"){
          this.dataService.getDialogData().deceasedList = this.dataService.getDialogData().deceasedList.split(",");
        }
        // if user changed dateOfBirth
        if(typeof(this.dataService.getDialogData().dateOfBirth) === "string"){
          this.dataService.getDialogData().dateOfBirth = this.dataService.getDialogData().dateOfBirth.split(",");
        }
        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().dateOfDeath) === "string"){
          this.dataService.getDialogData().dateOfDeath = this.dataService.getDialogData().dateOfDeath.split(",");
        }

        const formData = new FormData();
        formData.append('file', this.dataService.getDialogData().file);
        formData.append('GPS', this.dataService.getDialogData().GPS);
        formData.append(
          'municipalityDescription',
          this.dataService.getDialogData().municipalityDescription
        );
        formData.append('location', this.dataService.getDialogData().location);

        formData.append('addedBy', this.dataService.getDialogData().addedBy);
        formData.append(
          'photoDescription',
          this.dataService.getDialogData().photoDescription
        );

        for (const deceased of this.dataService.getDialogData().deceasedList) {
          formData.append('deceasedList', deceased);
        }

        for (const birth of this.dataService.getDialogData().dateOfBirth) {
          formData.append('dateOfBirth', birth);
        }
        for (const death of this.dataService.getDialogData().dateOfDeath) {
          formData.append('dateOfDeath', death);
        }
        formData.append('name', this.dataService.getDialogData().name);


        this.dataService
        .addIssue(formData)
        .pipe(
          tap((response: any) => {
            this.notificationService.success(`Záznam s id: ${response._id} bol úspešne pridaný`);


            delete response.__v;

            this.exampleDatabase.dataChange.value.push(response);
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

  startEdit(i: number, _id: string, GPS: string, addedBy: string, dateOfBirth: string, dateOfDeath: string, deceasedList: string,  imagePath: string, location: string, municipalityDescription: string, name: string, photoDescription: string, state: string) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {_id: _id, GPS: GPS, dateOfBirth: dateOfBirth, dateOfDeath: dateOfDeath, deceasedList: deceasedList, location: location, municipalityDescription: municipalityDescription, name: name, photoDescription: photoDescription, imagePath:imagePath, state: state, addedBy:addedBy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase!.dataChange.value.findIndex((x: { _id: string; }) => x._id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();


        // removes empty string from array and makes the array empty

        if(this.dataService.getDialogData().deceasedList === undefined || this.dataService.getDialogData().deceasedList[0] === '' ){
          this.dataService.getDialogData().deceasedList = []
        }

        if(this.dataService.getDialogData().dateOfBirth === undefined || this.dataService.getDialogData().dateOfBirth[0] === ''){
          this.dataService.getDialogData().dateOfBirth = []
        }

        if(this.dataService.getDialogData().dateOfDeath === undefined || this.dataService.getDialogData().dateOfDeath[0] === ''){
          this.dataService.getDialogData().dateOfDeath = []
        }

        // if user changed reason of deceasedList
        if(typeof(this.dataService.getDialogData().deceasedList) === "string"){
          this.dataService.getDialogData().deceasedList = this.dataService.getDialogData().deceasedList.split(",");
        }
        // if user changed dateOfBirth
        if(typeof(this.dataService.getDialogData().dateOfBirth) === "string"){
          this.dataService.getDialogData().dateOfBirth = this.dataService.getDialogData().dateOfBirth.split(",");
        }
        // if user changed reason of death
        if(typeof(this.dataService.getDialogData().dateOfDeath) === "string"){
          this.dataService.getDialogData().dateOfDeath = this.dataService.getDialogData().dateOfDeath.split(",");
        }

        // And lastly refresh table







        const formData = new FormData();
        formData.append('file', this.dataService.getDialogData().file);
        formData.append('GPS', this.dataService.getDialogData().GPS);
        formData.append(
          'municipalityDescription',
          this.dataService.getDialogData().municipalityDescription
        );
        formData.append('location', this.dataService.getDialogData().location);
        formData.append('state', this.dataService.getDialogData().state);
        formData.append('imagePath', this.dataService.getDialogData().imagePath);
        formData.append('_id', this.dataService.getDialogData()._id);
        formData.append('addedBy', this.dataService.getDialogData().addedBy);
        formData.append(
          'photoDescription',
          this.dataService.getDialogData().photoDescription
        );

        for (const deceased of this.dataService.getDialogData().deceasedList) {
          formData.append('deceasedList', deceased);
        }

        for (const birth of this.dataService.getDialogData().dateOfBirth) {
          formData.append('dateOfBirth', birth);
        }
        for (const death of this.dataService.getDialogData().dateOfDeath) {
          formData.append('dateOfDeath', death);
        }
        formData.append('name', this.dataService.getDialogData().name);




        if(this.dataService.getDialogData().checked){
          this.dataService
          .updateIssueBackendWithoutFile(this.dataService.getDialogData())
          .pipe(
            tap((response: any) => {
              this.notificationService.success(`Záznam s id: ${response._id} bol úspešne zmenený`);

              this.exampleDatabase.dataChange.value.forEach((x: any) => {
                if (x._id=== response._id) {
                  x.imagePath = response.imagePath;
                }
              })
              this.refreshTable();
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
        else{
          this.dataService
          .updateIssueBackend(formData)
          .pipe(
            tap((response: any) => {
              this.notificationService.success(`Záznam s id: ${response._id} bol úspešne zmenený`);



              this.exampleDatabase.dataChange.value.forEach((x: any) => {
                if (x._id=== response._id) {
                  x.imagePath = response.imagePath;
                }
              })
              this.refreshTable();
              // this.exampleDatabase.dataChange.value.push(response);
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
            // this.notificationService.success('Boj bol úspešne odstránený');

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


  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;

        const dialogRef = this.dialog.open(ShowImageDialogComponent, {
        data: {imageToShow: this.imageToShow }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

      }
    });
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
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
          const searchStr = (issue.GPS + issue.addedBy + issue.dateOfBirth + issue.dateOfDeath + issue.deceasedList + issue.imagePath  + issue.location  + issue.municipalityDescription + issue.name + issue.photoDescription + issue.state + issue._id).toLowerCase();
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
        case 'dateOfBirth': [propertyA, propertyB] = [a.dateOfBirth, b.dateOfBirth]; break;
        case 'dateOfDeath': [propertyA, propertyB] = [a.dateOfDeath, b.dateOfDeath]; break;
        case 'deceasedList': [propertyA, propertyB] = [a.deceasedList, b.deceasedList]; break;
        case 'imagePath': [propertyA, propertyB] = [a.imagePath, b.imagePath]; break;
        case 'location': [propertyA, propertyB] = [a.location, b.location]; break;
        case 'municipalityDescription': [propertyA, propertyB] = [a.municipalityDescription, b.municipalityDescription]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'photoDescription': [propertyA, propertyB] = [a.photoDescription, b.photoDescription]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
