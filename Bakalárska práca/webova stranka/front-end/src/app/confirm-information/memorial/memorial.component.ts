import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AddInformationService } from 'src/app/slovakia-map/services/add-information.service';
import { ConfirmInformationService } from '../services/confirm-information.service';
import { memorialResponse } from '../types/memorialTypes';

@Component({
  selector: 'app-memorial',
  templateUrl: './memorial.component.html',
  styleUrls: ['./memorial.component.scss'],
})
export class MemorialComponent implements OnInit {
  globalIdIndex = 0;
  imageSrc: any;
  username: string = '';
  deceasedFlag: boolean = false;
  dateOfBirthFlag: boolean = false;
  dateOfDeathFlag: boolean = false;
  memorial = {} as any;
  memorialID: string = '';
  imagePath: string = '';
  fileFlag: boolean = false;
  formData = new FormData();
  deceasedLists: any[] = [];
  dateOfBirths: any[] = [];
  dateOfDeaths: any[] = [];
  memorialForm: FormGroup;
  errorMsg: string | undefined;
  fileName = '';
  file!: File;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private confirmInformationService: ConfirmInformationService,
    public router: Router,
    private meta: Meta,
  ) {
    this.memorialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      GPS: ['', [Validators.required]],
      file: [''],
      municipalityDescription: [''],
      location: [''],
      photoDescription: [''],
      deceased: [''],
      dateOfBirth: [''],
      dateOfDeath: [''],
    });
    this.meta.addTags([
      { name: 'memorial:card', content: 'memorial' },
    ]);
  }

  ngOnInit(): void {
    this.confirmInformationService
      .getMemorial()
      .pipe(
        tap((memorial: any) => {
          this.memorial = memorial;
          this.memorialID = memorial._id;




          let newArray:any = []
          memorial.deceasedList.forEach((element: any, index: any) => {
            newArray.push({"id": `${element}-${index}`, "element": element});
          })
          this.deceasedLists = newArray
          this.globalIdIndex = this.deceasedLists.length;

          newArray= []
          memorial.dateOfBirth.forEach((element: any, index: any) => {
            newArray.push({"id": `${element}-${index}`, "element": element});
          })
          this.dateOfBirths = newArray

          if(this.dateOfBirths.length > this.globalIdIndex){
            this.globalIdIndex = this.dateOfBirths.length;
          }

          newArray= []
          memorial.dateOfDeath.forEach((element: any, index: any) => {
            newArray.push({"id": `${element}-${index}`, "element": element});
          })
          this.dateOfDeaths = newArray
          if(this.dateOfDeaths.length > this.globalIdIndex){
            this.globalIdIndex = this.dateOfDeaths.length;
          }


          this.imagePath = memorial.imagePath;
          this.username = memorial.addedBy;

          this.confirmInformationService.getImage(memorial.imagePath).subscribe(
            (data) => {
              this.createImageFromBlob(data);
            },
            (error) => {
              console.log(error);
            }
          );
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

  remove() {
    this.confirmInformationService
      .removeMemorial(this.memorialID)
      .pipe(
        tap((response: memorialResponse) => {
          this.notificationService.success('Pamätník  bol úspešne odstránený');

          this.router.navigate(['/'], {
            // queryParams: { logged: 'true' },
          });
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

  submit() {
    const formData = new FormData();
    formData.append('imagePath', this.imagePath);
    formData.append('id', this.memorialID);
    formData.append('file', this.file);
    formData.append('addedBy', this.username);
    formData.append('name', this.memorialForm.get('name')!.value);
    formData.append('GPS', this.memorialForm.get('GPS')!.value);
    formData.append(
      'municipalityDescription',
      this.memorialForm.get('municipalityDescription')!.value
    );
    formData.append('location', this.memorialForm.get('location')!.value);
    formData.append(
      'photoDescription',
      this.memorialForm.get('photoDescription')!.value
    );

    for (const deceased of this.deceasedLists) {
      formData.append('deceasedList', deceased.element);
    }

    for (const birth of this.dateOfBirths) {
      formData.append('dateOfBirth', birth.element);
    }
    for (const death of this.dateOfDeaths) {
      formData.append('dateOfDeath', death.element);
    }


    this.confirmInformationService
      .addMemorial(formData)
      .pipe(
        tap((response: memorialResponse) => {
          this.notificationService.success('Pamätník bol úspešne pridaný');

          this.router.navigate(['/'], {
            queryParams: { cemeteryAdded: 'true' },
          });
        }),
        catchError((error) => {
          this.notificationService.error('Nezadal si všetky potrebné údaje');
          // .get('username')!
          // .setErrors({ badRequest: true, required: true });
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
      .subscribe();
  }

  addDeceased() {
    if(this.memorialForm.get('deceased')!.value === '' || this.memorialForm.get('deceased')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.deceasedLists.push({"id": `${this.memorialForm.get('deceased')!.value}-${this.globalIdIndex}`, "element": this.memorialForm.get('deceased')!.value});
      this.globalIdIndex++;
      this.memorialForm.controls['deceased'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  addBirthDate() {
    if(this.memorialForm.get('dateOfBirth')!.value === '' || this.memorialForm.get('dateOfBirth')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.dateOfBirths.push({"id": `${this.memorialForm.get('dateOfBirth')!.value}-${this.globalIdIndex}`, "element": this.memorialForm.get('dateOfBirth')!.value});
      this.globalIdIndex++;
      this.memorialForm.controls['dateOfBirth'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  addDateOfDeath() {
    if(this.memorialForm.get('dateOfDeath')!.value === '' || this.memorialForm.get('dateOfDeath')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.dateOfDeaths.push({"id": `${this.memorialForm.get('dateOfDeath')!.value}-${this.globalIdIndex}`, "element": this.memorialForm.get('dateOfDeath')!.value});
      this.globalIdIndex++;
      this.memorialForm.controls['dateOfDeath'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;
      this.fileFlag = false;
    }
  }

  changeDeceased() {
    this.deceasedFlag = !this.deceasedFlag;
    this.dateOfBirthFlag = false;
    this.dateOfDeathFlag = false;
  }

  changeBirthDate() {
    this.dateOfBirthFlag = !this.dateOfBirthFlag;

    this.deceasedFlag = false;

    this.dateOfDeathFlag = false;
  }

  changeDeathDate() {
    this.dateOfDeathFlag = !this.dateOfDeathFlag;

    this.deceasedFlag = false;
    this.dateOfBirthFlag = false;
  }

  onClickUpdateDeceased(event: any, deceased: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];

      this.deceasedLists.forEach((element: any, index: any, array: any) => {
        if (element.element === name && element.id === id) {
          array[index] = {'id': `${deceased}-${this.globalIdIndex}`, "element": deceased};
          event._elementRef.nativeElement.id = `${deceased}-${this.globalIdIndex}`;
          this.notificationService.success('Záznam bol úspešne zmenený');
          this.globalIdIndex++;
        }
      });

  }

  onClickDeleteDeceased(event: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];

    this.deceasedLists.forEach((element: any, index: any) => {
      if (element.element === name, element.id === id) {
        this.deceasedLists.splice(index, 1);
      }
    });
  }

  onClickUpdateDateBirth(event: any, date: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];


      this.dateOfBirths.forEach((element: any, index: any, array: any) => {
        if (element.element === name && element.id === id) {
          array[index] = {'id': `${date}-${this.globalIdIndex}`, "element": date};
          event._elementRef.nativeElement.id = `${date}-${this.globalIdIndex}`;
          this.notificationService.success('Záznam bol úspešne zmenený');
          this.globalIdIndex++;
        }
      });
    }


  onClickDeleteDateBirth(event: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];

    this.dateOfBirths.forEach((element: any, index: any) => {
      if (element.element === name && element.id === id) {
        this.dateOfBirths.splice(index, 1);
      }
    });
  }

  onClickUpdateDateOfDeath(event: any, date: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];


      this.dateOfDeaths.forEach((element: any, index: any, array: any) => {
        if (element.element === name && element.id === id) {
          array[index] = {'id': `${date}-${this.globalIdIndex}`, "element": date};
          event._elementRef.nativeElement.id = `${date}-${this.globalIdIndex}`;
          this.notificationService.success('Záznam bol úspešne zmenený');
          this.globalIdIndex++;
        }
      });

  }

  onClickDeleteDateOfDeath(event: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];
    this.dateOfDeaths.forEach((element: any, index: any) => {
      if (element.element === name && element.id === id) {
        this.dateOfDeaths.splice(index, 1);
      }
    });
  }
  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
