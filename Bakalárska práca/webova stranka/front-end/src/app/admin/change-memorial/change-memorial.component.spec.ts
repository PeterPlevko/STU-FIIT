import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemorialComponent } from './change-memorial.component';

describe('ChangeMemorialComponent', () => {
  let component: ChangeMemorialComponent;
  let fixture: ComponentFixture<ChangeMemorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMemorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
