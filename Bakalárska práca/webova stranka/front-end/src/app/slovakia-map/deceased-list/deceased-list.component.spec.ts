import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedListComponent } from './deceased-list.component';

describe('DeceasedListComponent', () => {
  let component: DeceasedListComponent;
  let fixture: ComponentFixture<DeceasedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeceasedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
