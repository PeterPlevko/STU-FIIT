import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBattleComponent } from './change-battle.component';

describe('ChangeBattleComponent', () => {
  let component: ChangeBattleComponent;
  let fixture: ComponentFixture<ChangeBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
