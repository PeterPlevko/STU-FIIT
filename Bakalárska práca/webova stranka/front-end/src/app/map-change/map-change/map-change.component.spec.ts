import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapChangeComponent } from './map-change.component';

describe('MapChangeComponent', () => {
  let component: MapChangeComponent;
  let fixture: ComponentFixture<MapChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
