import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialComponent } from './memorial.component';

describe('MemorialComponent', () => {
  let component: MemorialComponent;
  let fixture: ComponentFixture<MemorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
