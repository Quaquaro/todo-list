import { Component, OnInit } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { ListOverview } from './ListOverview';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isVisible = true;

  readonly lists$ = observableOf<ListOverview[]>([
    { id: 1, title: 'Baumhaus bauen' },
    { id: 2, title: 'Renovieren' },
    { id: 3, title: 'Urlaub' },
  ]);

  toggle(): void {
    this.isVisible = !this.isVisible;
  }
  constructor() {}

  ngOnInit() {}
}
