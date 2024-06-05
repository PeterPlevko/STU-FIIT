import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWarCampComponent } from './change-war-camp.component';

describe('ChangeWarCampComponent', () => {
  let component: ChangeWarCampComponent;
  let fixture: ComponentFixture<ChangeWarCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeWarCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWarCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
