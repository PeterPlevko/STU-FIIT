import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformationFormComponent } from './add-information-form.component';

describe('AddInformationFormComponent', () => {
  let component: AddInformationFormComponent;
  let fixture: ComponentFixture<AddInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInformationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
