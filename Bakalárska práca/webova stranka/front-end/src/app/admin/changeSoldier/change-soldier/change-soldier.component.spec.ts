import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSoldierComponent } from './change-soldier.component';

describe('ChangeSoldierComponent', () => {
  let component: ChangeSoldierComponent;
  let fixture: ComponentFixture<ChangeSoldierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSoldierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSoldierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
