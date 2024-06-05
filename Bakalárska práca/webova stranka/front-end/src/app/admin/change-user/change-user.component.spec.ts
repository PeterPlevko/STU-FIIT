import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserComponent } from './change-user.component';

describe('ChangeUserComponent', () => {
  let component: ChangeUserComponent;
  let fixture: ComponentFixture<ChangeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
