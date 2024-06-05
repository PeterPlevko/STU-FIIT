import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable, takeUntil } from 'rxjs';
import { DisposableComponent } from 'src/app/partials/disposable/disposable-components';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { State } from 'src/app/partials/services/app-state/types/appStateTypes';

@Component({
  selector: 'app-welcome-text',
  templateUrl: './welcome-text.component.html',
  styleUrls: ['./welcome-text.component.scss'],
})
export class WelcomeTextComponent
  extends DisposableComponent
  implements OnInit
{
  appState$: Observable<State> | undefined; // this is needed to use appstate
  constructor(private appStateService: AppStateService,
    private meta: Meta,) {
    super();
    this.meta.addTags([
      { name: 'welcome-text:card', content: 'welcome text' },
    ]);
  }

  ngOnInit(): void {
    this.appState$ = this.appStateService
      .getState$()
      .pipe(takeUntil(this.destroySignal$));
  }
}
