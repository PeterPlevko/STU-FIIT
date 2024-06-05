import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCemeteryComponent } from './change-cemetery.component';

describe('ChangeCemeteryComponent', () => {
  let component: ChangeCemeteryComponent;
  let fixture: ComponentFixture<ChangeCemeteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCemeteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCemeteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
