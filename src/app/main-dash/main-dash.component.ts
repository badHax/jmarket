import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'BPOW', cols: 2, rows: 2 }
        ];
      }

      return [
         { title: 'BPOW', cols: 2, rows: 2 },
       ];
    })
  );
}
