import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CemeteryComponent } from './cemetery.component';

describe('CemeteryComponent', () => {
  let component: CemeteryComponent;
  let fixture: ComponentFixture<CemeteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CemeteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CemeteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
