import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarCampComponent } from './war-camp.component';

describe('WarCampComponent', () => {
  let component: WarCampComponent;
  let fixture: ComponentFixture<WarCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
