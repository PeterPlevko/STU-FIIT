import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { NavigationStart} from '@angular/router';
import 'leaflet.markercluster';
import { latLng, tileLayer } from 'leaflet';
import { tap, catchError, of, timer, Observable } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AddInformationService } from '../services/add-information.service';
import { State } from 'src/app/partials/services/app-state/types/appStateTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  markersGroup = L.markerClusterGroup();
  globalMap = {} as any;
  mapMarkers: any[] = [];
  errorMsg: string = '';
  @ViewChild('matMenuTrigger', { read: MatMenuTrigger })
  matMenuTriggerRef!: MatMenuTrigger;
  @ViewChild('matMenuTrigger', { read: MatButton })
  matButtonRef!: MatButton;
  @ViewChildren('menuItems')
  menuItemsRef!: QueryList<MatCheckbox>;
  private routeSub:any;  // subscription to route observer
  appState$: Observable<State> | undefined; // this is needed to use appstate
  public triggerButtonText = 'Vyber čo chceš zobraziť';
  currentBattleDate: string = '';
  showDateFlag:boolean = false

  public options = [
    { title: 'Cintorín', activated: false, value: 'Cintorín' },
    { title: 'Boj', activated: false, value: 'Boj' },
    { title: 'Pamätník', activated: false, value: 'Pamätník' },
    { title: 'Zajatecký tábor', activated: false, value: 'Zajatecký tábor' },
    { title: 'Priebeh bojov', activated: false, value: 'Priebeh bojov' },

  ];
  defaultValues: boolean = false;
  selectedOptions: string[] = [];
  constructor(
    private meta: Meta,
    private appStateService: AppStateService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private addInformationService: AddInformationService,
    public router: Router
  ) {
    this.meta.addTags([
      { name: 'map:card', content: 'map of slovakia' },
    ]);
  }

  ngOnInit(): void {
    this.appState$ = this.appStateService
    .getState$()
    // map setup
    var myIcon = L.icon({
      iconUrl: '../../../assets/img/cemeteryIcons/tombStone.png',
      iconSize: [20, 20],
    });

    var southWest = L.latLng(47.482634, 16.384388),
    northEast = L.latLng(50.037094, 22.97873),
    mybounds = L.latLngBounds(southWest, northEast);
    this.globalMap = L.map('slovakiaMap', {minZoom:7}).setView([48.669, 19.699], 7).setMaxBounds(mybounds);;
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(this.globalMap);
    this.globalMap.on("dblclick", (event: any ) => {
      var coord = event.latlng.toString().split(',');

      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
      this.globalMap.setView([lat[1],lng[0]], 12);
  });

    this.globalMap.on('click', function (e: any) {
      var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
    });

  }

  public onMenuOpened() {
    this.setFocusOnFirstItem();
    this.triggerButtonText = 'Zavri menu';
  }

  public onMenuClosed() {
    this.matButtonRef.focus();
    this.triggerButtonText = 'Vyber čo chceš zobraziť';

    for (var i = 0; i < this.mapMarkers.length; i++) {
      this.globalMap.removeLayer(this.mapMarkers[i]);
    }

    this.markersGroup.clearLayers();
    this.globalMap.removeLayer(this.markersGroup);



    this.showDateFlag = false;
    if(this.defaultValues){
      // cemetery
      if (this.selectedOptions.includes('Cintorín')) {



        this.addInformationService
          .getCemeteryDefault()
          .pipe(
            tap((cemetery: any) => {
              var myIcon = L.icon({
                iconUrl: '../../../assets/img/cemeteryIcons/tombStone.png',
                iconSize: [25, 25],
              });
              cemetery.forEach((element: any) => {
                let string = element.GPS.split(' ');
                let lat = parseFloat(string[0]);
                let long = parseFloat(string[1]);
                let marker = L.marker([lat, long], {
                  icon: myIcon,
                })
                marker.on('click', (e:any) => {
                  var popup = L.popup()
                  var container = L.DomUtil.create('div');
                  container.classList.add('popupMap') ;
                  let name = document.createElement('p');
                  name.innerHTML = 'Cintorín';
                  name.classList.add('popupMapPNoMargin') ;
                  name.classList.add('title') ;
                  let GPS = document.createElement('p');
                  GPS.innerHTML = `GPS: ${lat} ${long}`;
                  GPS.classList.add('popupMapPNoMargin') ;
                  let linkButton = document.createElement('button');
                  linkButton.innerHTML = 'Chcem vedieť viac';
                  linkButton.classList.add('popupMapButton') ;
                  container.appendChild(name);
                  container.appendChild(GPS);
                  container.appendChild(linkButton);
                  popup
                  .setLatLng(e.latlng)
                  .setContent(container)
                  .openOn(this.globalMap);
                  L.DomEvent.on(linkButton, 'click', () => {
                    this.openCemeteryDialog(element);
                  });
                });
                this.markersGroup.addLayer(marker);
                this.mapMarkers.push(marker)
              });
              this.globalMap.addLayer(this.markersGroup);
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
      // battle
      if (this.selectedOptions.includes('Boj')) {

        this.addInformationService
          .getBattleDefault()
          .pipe(
            tap((battle: any) => {
              var myIcon = L.icon({
                iconUrl: '../../../assets/img/battleIcons/battle.jpg',
                iconSize: [25, 25],
              });
              battle.forEach((element: any) => {
                let string = element.GPS.split(' ');
                let lat = parseFloat(string[0]);
                let long = parseFloat(string[1]);
                let marker = L.marker([lat, long], {
                  icon: myIcon,
                })
                marker.on('click', (e:any) => {
                  var popup = L.popup()
                  var container = L.DomUtil.create('div');
                  container.classList.add('popupMap') ;
                  let name = document.createElement('p');
                  name.innerHTML = 'Boj';
                  name.classList.add('popupMapPNoMargin') ;
                  name.classList.add('title') ;

                  let nameOf = document.createElement('p');
                  nameOf.innerHTML = `Nazov boja: ${element.name}`;
                  nameOf.classList.add('popupMapPNoMargin') ;

                  let GPS = document.createElement('p');
                  GPS.innerHTML = `GPS: ${lat} ${long}`;
                  GPS.classList.add('popupMapPNoMargin') ;

                  let linkButton = document.createElement('button');
                  linkButton.innerHTML = 'Chcem vedieť viac';
                  linkButton.classList.add('popupMapButton') ;
                  container.appendChild(name);
                  container.appendChild(nameOf);
                  container.appendChild(GPS);
                  container.appendChild(linkButton);
                  popup
                  .setLatLng(e.latlng)
                  .setContent(container)
                  .openOn(this.globalMap);
                  L.DomEvent.on(linkButton, 'click', () => {
                    this.openBattleDialog(element);
                  });
                });
                this.markersGroup.addLayer(marker);
                this.mapMarkers.push(marker)
              });
              this.globalMap.addLayer(this.markersGroup);
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
      // warcamp
      if (this.selectedOptions.includes('Zajatecký tábor')) {

        this.addInformationService
          .getWarCampDefault()
          .pipe(
            tap((warCamp: any) => {
              var myIcon = L.icon({
                iconUrl: '../../../assets/img/warCampIcons/warCamp.png',
                iconSize: [25, 25],
              });
              warCamp.forEach((element: any) => {
                let string = element.GPS.split(' ');
                let lat = parseFloat(string[0]);
                let long = parseFloat(string[1]);
                let marker = L.marker([lat, long], {
                  icon: myIcon,
                })
                marker.on('click', (e:any) => {
                  var popup = L.popup()
                  var container = L.DomUtil.create('div');
                  container.classList.add('popupMap') ;
                  let name = document.createElement('p');
                  name.innerHTML = 'Zajatecky tabor';
                  name.classList.add('popupMapPNoMargin') ;
                  name.classList.add('title') ;

                  let GPS = document.createElement('p');
                  GPS.innerHTML = `GPS: ${lat} ${long}`;
                  GPS.classList.add('popupMapPNoMargin') ;

                  let linkButton = document.createElement('button');
                  linkButton.innerHTML = 'Chcem vedieť viac';
                  linkButton.classList.add('popupMapButton') ;
                  container.appendChild(name);
                  container.appendChild(GPS);
                  container.appendChild(linkButton);
                  popup
                  .setLatLng(e.latlng)
                  .setContent(container)
                  .openOn(this.globalMap);
                  L.DomEvent.on(linkButton, 'click', () => {
                    this.openWarCampDialog(element);
                  });
                });
                this.markersGroup.addLayer(marker);
                this.mapMarkers.push(marker)
              });
              this.globalMap.addLayer(this.markersGroup);
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
      //battle and longitude:
      if (this.selectedOptions.includes('Priebeh bojov')) {
        this.showDateFlag = true;
        this.globalMap.setView([48.984573, 21.826635], 9);

        this.notificationService.success('Spustil si priebeh bojov');
        this.addInformationService
          .getBattleDefault()
          .pipe(
            tap((battle: any) => {
              battle.forEach((element: any) => {
                const [day, month, year] = element.startDate.split('/');
                const date = new Date(`${parseInt(year)}-${(parseInt(month))}-${parseInt(day)}`);
                element.startDate = date
                // element.startDate = date.toLocaleDateString("en-US")
              });
              battle.sort((a:any,b:any) => (a.startDate > b.startDate) ? 1 : -1)
              battle.forEach((element: any) => {
                element.startDate = element.startDate.toLocaleDateString("en-US")
              });

              var myIcon = L.icon({
                iconUrl: '../../../assets/img/battleIcons/battle.jpg',
                iconSize: [25, 25],
              });

              var offset = 0;
              battle.forEach( async (element: any) => {


                setTimeout(() =>{
                  if(document.getElementById('battleDate')){
                    document.getElementById('battleDate')!.innerHTML = `Začiatok bitky: ${element.startDate}`;
                  }



                  let string = element.GPS.split(' ');
                  let lat = parseFloat(string[0]);
                  let long = parseFloat(string[1]);
                  let marker = L.marker([lat, long], {
                    icon: myIcon,
                  })
                    marker.on('click', (e:any) => {


                      var popup = L.popup()
                      var container = L.DomUtil.create('div');
                      container.classList.add('popupMap') ;
                      let name = document.createElement('p');
                      name.innerHTML = 'Boj';
                      name.classList.add('popupMapPNoMargin') ;
                      name.classList.add('title') ;
                      let nameOf = document.createElement('p');
                      nameOf.innerHTML = `Nazov boja: ${element.name}`;
                      nameOf.classList.add('popupMapPNoMargin') ;
                      let GPS = document.createElement('p');
                      GPS.innerHTML = `GPS: ${lat} ${long}`;
                      GPS.classList.add('popupMapPNoMargin') ;
                      let linkButton = document.createElement('button');
                      linkButton.innerHTML = 'Chcem vedieť viac';
                      linkButton.classList.add('popupMapButton') ;
                      container.appendChild(name);
                      container.appendChild(nameOf);
                      container.appendChild(GPS);
                      container.appendChild(linkButton);
                      popup
                      .setLatLng(e.latlng)
                      .setContent(container)
                      .openOn(this.globalMap);
                      L.DomEvent.on(linkButton, 'click', () => {
                        this.openBattleDialog(element);
                      });
                    });
                    this.markersGroup.addLayer(marker);
                    this.mapMarkers.push(marker)
                }, 1000 + offset);
               offset += 1000;
                });
                this.globalMap.addLayer(this.markersGroup);
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

      // memorial
      if (this.selectedOptions.includes('Pamätník')) {

        this.addInformationService
          .getMemorialDefault()
          .pipe(
            tap((memorial: any) => {
              var myIcon = L.icon({
                iconUrl: '../../../assets/img/memorialIcons/memorial.png',
                iconSize: [25, 25],
              });
              memorial.forEach((element: any) => {
                let string = element.GPS.split(' ');
                let lat = parseFloat(string[0]);
                let long = parseFloat(string[1]);
                let marker = L.marker([lat, long], {
                  icon: myIcon,
                })
                marker.on('click', (e:any) => {
                  this.addInformationService.getImage(element.imagePath).subscribe(
                    async (data) => {
                      this.createImageFromBlob(data);

                    },
                    (error) => {
                      console.log(error);
                    }
                  );

                  var popup = L.popup()
                  var container = L.DomUtil.create('div');
                  container.classList.add('popupMap') ;
                  let name = document.createElement('p');
                  name.innerHTML = 'Pamätník';
                  name.classList.add('popupMapPNoMargin') ;
                  name.classList.add('title') ;

                  let GPS = document.createElement('p');
                  GPS.innerHTML = `GPS: ${lat} ${long}`;
                  GPS.classList.add('popupMapPNoMargin') ;

                  let linkButton = document.createElement('button');
                  linkButton.innerHTML = 'Chcem vedieť viac';
                  linkButton.classList.add('popupMapButton') ;
                  container.appendChild(name);
                  container.appendChild(GPS);
                  container.appendChild(linkButton);
                  popup
                  .setLatLng(e.latlng)
                  .setContent(container)
                  .openOn(this.globalMap);
                  L.DomEvent.on(linkButton, 'click', () => {


                    this.openMemorialDialog(element, this.imageToShow);
                  });
                });
                this.markersGroup.addLayer(marker);
                this.mapMarkers.push(marker)
              });
              this.globalMap.addLayer(this.markersGroup);
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




    }
    // end of default values
    // here starts ading of adde values by users
    else{
            // cemetery
            if (this.selectedOptions.includes('Cintorín')) {

              this.addInformationService
                .getCemeteryAdded()
                .pipe(
                  tap((cemetery: any) => {
                    var myIcon = L.icon({
                      iconUrl: '../../../assets/img/cemeteryIcons/tombStone.png',
                      iconSize: [25, 25],
                    });
                    cemetery.forEach((element: any) => {
                      let string = element.GPS.split(' ');
                      let lat = parseFloat(string[0]);
                      let long = parseFloat(string[1]);
                      let marker = L.marker([lat, long], {
                        icon: myIcon,
                      })
                      marker.on('click', (e:any) => {
                        var popup = L.popup()
                        var container = L.DomUtil.create('div');
                        container.classList.add('popupMap') ;
                        let name = document.createElement('p');
                        name.innerHTML = 'Cintorín';
                        name.classList.add('popupMapPNoMargin') ;
                        name.classList.add('title') ;
                        let GPS = document.createElement('p');
                        GPS.innerHTML = `GPS: ${lat} ${long}`;
                        GPS.classList.add('popupMapPNoMargin') ;
                        let linkButton = document.createElement('button');
                        linkButton.innerHTML = 'Chcem vedieť viac';
                        linkButton.classList.add('popupMapButton') ;
                        container.appendChild(name);
                        container.appendChild(GPS);
                        container.appendChild(linkButton);
                        popup
                        .setLatLng(e.latlng)
                        .setContent(container)
                        .openOn(this.globalMap);
                        L.DomEvent.on(linkButton, 'click', () => {
                          this.openCemeteryDialog(element);
                        });
                      });
                      this.markersGroup.addLayer(marker);
                      this.mapMarkers.push(marker)
                    });
                    this.globalMap.addLayer(this.markersGroup);
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
            // battle
            if (this.selectedOptions.includes('Boj')) {

              this.addInformationService
                .getBattleAdded()
                .pipe(
                  tap((battle: any) => {
                    var myIcon = L.icon({
                      iconUrl: '../../../assets/img/battleIcons/battle.jpg',
                      iconSize: [25, 25],
                    });
                    battle.forEach((element: any) => {
                      let string = element.GPS.split(' ');
                      let lat = parseFloat(string[0]);
                      let long = parseFloat(string[1]);
                      let marker = L.marker([lat, long], {
                        icon: myIcon,
                      })
                      marker.on('click', (e:any) => {
                        var popup = L.popup()
                        var container = L.DomUtil.create('div');
                        container.classList.add('popupMap') ;
                        let name = document.createElement('p');
                        name.innerHTML = 'Boj';
                        name.classList.add('popupMapPNoMargin') ;
                        name.classList.add('title') ;

                        let nameOf = document.createElement('p');
                        nameOf.innerHTML = `Nazov boja: ${element.name}`;
                        nameOf.classList.add('popupMapPNoMargin') ;

                        let GPS = document.createElement('p');
                        GPS.innerHTML = `GPS: ${lat} ${long}`;
                        GPS.classList.add('popupMapPNoMargin') ;

                        let linkButton = document.createElement('button');
                        linkButton.innerHTML = 'Chcem vedieť viac';
                        linkButton.classList.add('popupMapButton') ;
                        container.appendChild(name);
                        container.appendChild(nameOf);
                        container.appendChild(GPS);
                        container.appendChild(linkButton);
                        popup
                        .setLatLng(e.latlng)
                        .setContent(container)
                        .openOn(this.globalMap);
                        L.DomEvent.on(linkButton, 'click', () => {
                          this.openBattleDialog(element);
                        });
                      });
                      this.markersGroup.addLayer(marker);
                      this.mapMarkers.push(marker)
                    });
                    this.globalMap.addLayer(this.markersGroup);
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
            // warcamp
            if (this.selectedOptions.includes('Zajatecký tábor')) {

              this.addInformationService
                .getWarCampAdded()
                .pipe(
                  tap((warCamp: any) => {
                    var myIcon = L.icon({
                      iconUrl: '../../../assets/img/warCampIcons/warCamp.png',
                      iconSize: [25, 25],
                    });
                    warCamp.forEach((element: any) => {
                      let string = element.GPS.split(' ');
                      let lat = parseFloat(string[0]);
                      let long = parseFloat(string[1]);
                      let marker = L.marker([lat, long], {
                        icon: myIcon,
                      })
                      marker.on('click', (e:any) => {
                        var popup = L.popup()
                        var container = L.DomUtil.create('div');
                        container.classList.add('popupMap') ;
                        let name = document.createElement('p');
                        name.innerHTML = 'Zajatecky tabor';
                        name.classList.add('popupMapPNoMargin') ;
                        name.classList.add('title') ;

                        let GPS = document.createElement('p');
                        GPS.innerHTML = `GPS: ${lat} ${long}`;
                        GPS.classList.add('popupMapPNoMargin') ;

                        let linkButton = document.createElement('button');
                        linkButton.innerHTML = 'Chcem vedieť viac';
                        linkButton.classList.add('popupMapButton') ;
                        container.appendChild(name);
                        container.appendChild(GPS);
                        container.appendChild(linkButton);
                        popup
                        .setLatLng(e.latlng)
                        .setContent(container)
                        .openOn(this.globalMap);
                        L.DomEvent.on(linkButton, 'click', () => {
                          this.openWarCampDialog(element);
                        });
                      });
                      this.markersGroup.addLayer(marker);
                      this.mapMarkers.push(marker)
                    });
                    this.globalMap.addLayer(this.markersGroup);
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
            // memorial
            if (this.selectedOptions.includes('Pamätník')) {

              this.addInformationService
                .getMemorialAdded()
                .pipe(
                  tap((memorial: any) => {
                    var myIcon = L.icon({
                      iconUrl: '../../../assets/img/memorialIcons/memorial.png',
                      iconSize: [25, 25],
                    });
                    memorial.forEach((element: any) => {
                      let string = element.GPS.split(' ');
                      let lat = parseFloat(string[0]);
                      let long = parseFloat(string[1]);
                      let marker = L.marker([lat, long], {
                        icon: myIcon,
                      })
                      marker.on('click', (e:any) => {
                        this.addInformationService.getImage(element.imagePath).subscribe(
                          async (data) => {
                            this.createImageFromBlob(data);

                          },
                          (error) => {
                            console.log(error);
                          }
                        );

                        var popup = L.popup()
                        var container = L.DomUtil.create('div');
                        container.classList.add('popupMap') ;
                        let name = document.createElement('p');
                        name.innerHTML = 'Pamätník';
                        name.classList.add('popupMapPNoMargin') ;
                        name.classList.add('title') ;

                        let GPS = document.createElement('p');
                        GPS.innerHTML = `GPS: ${lat} ${long}`;
                        GPS.classList.add('popupMapPNoMargin') ;

                        let linkButton = document.createElement('button');
                        linkButton.innerHTML = 'Chcem vedieť viac';
                        linkButton.classList.add('popupMapButton') ;
                        container.appendChild(name);
                        container.appendChild(GPS);
                        container.appendChild(linkButton);
                        popup
                        .setLatLng(e.latlng)
                        .setContent(container)
                        .openOn(this.globalMap);
                        L.DomEvent.on(linkButton, 'click', () => {


                          this.openMemorialDialog(element, this.imageToShow);
                        });
                      });
                      this.markersGroup.addLayer(marker);
                      this.mapMarkers.push(marker)
                    });
                    this.globalMap.addLayer(this.markersGroup);
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
             // priebeh bojov
      if (this.selectedOptions.includes('Priebeh bojov')) {
        this.showDateFlag = true;

        this.notificationService.success('Spustil si priebeh bojov');
        this.addInformationService
          .getBattleAdded()
          .pipe(
            tap((battle: any) => {
              battle.forEach((element: any) => {

                const [day, month, year] = element.startDate.split('/');
                const date = new Date(`${parseInt(year)}-${(parseInt(month))}-${parseInt(day)}`);
                element.startDate = date
                // element.startDate = date.toLocaleDateString("en-US")
              });
              battle.sort((a:any,b:any) => (a.startDate > b.startDate) ? 1 : -1)
              battle.forEach((element: any) => {
                element.startDate = element.startDate.toLocaleDateString("en-US")
              });

              var myIcon = L.icon({
                iconUrl: '../../../assets/img/battleIcons/battle.jpg',
                iconSize: [25, 25],
              });

              var offset = 0;
              battle.sort((a:any,b:any) => a.startDate.localeCompare(b.startDate));

              battle.forEach( async (element: any) => {

                setTimeout(() => {
                  if(document.getElementById('battleDate')){
                    document.getElementById('battleDate')!.innerHTML = `Začiatok bitky: ${element.startDate}`;
                  }

                  let string = element.GPS.split(' ');
                  let lat = parseFloat(string[0]);
                  let long = parseFloat(string[1]);
                  let marker = L.marker([lat, long], {
                    icon: myIcon,
                  })
                    marker.addTo(this.globalMap).on('click', (e:any) => {
                      var popup = L.popup()
                      var container = L.DomUtil.create('div');
                      container.classList.add('popupMap') ;
                      let name = document.createElement('p');
                      name.innerHTML = 'Boj';
                      name.classList.add('popupMapPNoMargin') ;
                      name.classList.add('title') ;
                      let nameOf = document.createElement('p');
                      nameOf.innerHTML = `Nazov boja: ${element.name}`;
                      nameOf.classList.add('popupMapPNoMargin') ;
                      let GPS = document.createElement('p');
                      GPS.innerHTML = `GPS: ${lat} ${long}`;
                      GPS.classList.add('popupMapPNoMargin') ;
                      let linkButton = document.createElement('button');
                      linkButton.innerHTML = 'Chcem vedieť viac';
                      linkButton.classList.add('popupMapButton') ;
                      container.appendChild(name);
                      container.appendChild(nameOf);
                      container.appendChild(GPS);
                      container.appendChild(linkButton);
                      popup
                      .setLatLng(e.latlng)
                      .setContent(container)
                      .openOn(this.globalMap);
                      L.DomEvent.on(linkButton, 'click', () => {
                        this.openBattleDialog(element);
                      });
                    });
                    marker.addTo(this.globalMap) // redundant
                    this.mapMarkers.push(marker)
                }, 1000 + offset);
               offset += 1000;
                });
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

  public onSelectValue() {
    this.selectedOptions = this.options
      .filter((menuitem) => menuitem.activated)
      .map((menuitem) => menuitem.title);
  }

  private setFocusOnFirstItem(): void {
    const firstCheckbox = this.menuItemsRef.first;
    firstCheckbox.focus();
    firstCheckbox._elementRef.nativeElement.classList.add(
      'cdk-keyboard-focused'
    );
  }

  private setCheckboxFocus(index: number) {
    const checkBox = this.menuItemsRef.get(index);
    if (checkBox) {
      checkBox.focus();
    }
  }


  openCemeteryDialog(element:any): void {

    const dialogRef = this.dialog.open(CemeteryDialog, {
      width: '1000px',
      height: '500px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openBattleDialog(element:any): void {
    const dialogRef = this.dialog.open(BattleDialog, {
      width: '1000px',
      height: '500px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openWarCampDialog(element:any): void {

    const dialogRef = this.dialog.open(WarCampDialog, {
      width: '1000px',
      height: '500px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openMemorialDialog(element:any, imageToShow:any): void {

    const dialogRef = this.dialog.open(MemorialDialog, {
      width: '1000px',
      height: '500px',
      data: {element, imageToShow},
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  createButton(label: string, container: any) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
    }

  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
        return "kkt"
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}



@Component({
  selector: 'cemetery-dialog',
  templateUrl: './cemetery-dialog.html',
  styleUrls: ['./cemetery-dialog.scss'],
})
export class CemeteryDialog {
  constructor(
    public dialogRef: MatDialogRef<CemeteryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'battle-dialog',
  templateUrl: './battle-dialog.html',
  styleUrls: ['./battle-dialog.scss'],
})
export class BattleDialog {
  constructor(
    public dialogRef: MatDialogRef<BattleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'warCamp-dialog',
  templateUrl: './warCamp-dialog.html',
  styleUrls: ['./warCamp-dialog.scss'],
})
export class WarCampDialog {
  constructor(
    public dialogRef: MatDialogRef<WarCampDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'memorial-dialog',
  templateUrl: './memorial-dialog.html',
  styleUrls: ['./memorial-dialog.scss'],
})
export class MemorialDialog {
  constructor(
    public dialogRef: MatDialogRef<MemorialDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
