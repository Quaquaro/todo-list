import { OverviewService } from './overview.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, of as observableOf, Subject, takeUntil, tap } from 'rxjs';
import { ListOverview } from './ListOverview';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnDestroy {
  isVisible = true;
  title = '';
  readonly lists$ = new Subject<ListOverview[]>();
  private terminator = new Subject<void>();

  constructor(private readonly service: OverviewService, router: Router) {
    service
      .findAll()
      .pipe(tap((lists) => this.lists$.next(lists)))
      .subscribe();
    router.events.subscribe(() => (this.isVisible = false));
  }
  toggle(): void {
    this.isVisible = !this.isVisible;
  }

  create(form: NgForm) {
    this.service
      .create(this.title)
      .pipe(
        tap(() => form.reset()),
        mergeMap(() => this.service.findAll()),
        tap((lists) => this.lists$.next(lists)),
        takeUntil(this.terminator)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.terminator.next(undefined);
    this.terminator.complete();
  }
}
