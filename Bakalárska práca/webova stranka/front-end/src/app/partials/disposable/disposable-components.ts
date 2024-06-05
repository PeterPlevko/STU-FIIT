import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DisposableComponent implements OnDestroy {
  destroySignal$ = new Subject();

  ngOnDestroy() {
    this.destroySignal$.next(null);
    this.destroySignal$.complete();
  }
}
