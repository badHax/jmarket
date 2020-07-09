import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { GoogleChartComponent} from "angular-google-charts"

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements AfterViewInit{
  @ViewChild('chart') divToMeasureElement: ElementRef;

  ngAfterViewInit() {
    let divToMeasureWidth = this.divToMeasureElement.nativeElement.offsetWidth;
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Stock 1', cols: 1, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
         { title: 'Stock 1', cols: 2, rows: 2 },
      //   { title: 'Card 2', cols: 1, rows: 1 },
      //   { title: 'Card 3', cols: 1, rows: 2 },
      //   { title: 'Card 4', cols: 1, rows: 1 }
       ];
    })
  );

  title = 'Stock Name';
  type = 'CandlestickChart';
  data = [
     ["Mon", 20, 28, 38, 45],
     ["Tue", 31, 38, 55, 66],
     ["Wed", 50, 55, 77, 80],
     ["Thu", 77, 77, 66, 50],
     ["Fri", 68, 66, 22, 15]
  ];
  columnNames = ['Date', 'A','B','C','D'];
  options = {
     legend:'none',
     candlestick: {
        fallingColor: { strokeWidth: 2, stroke:'#a52714' }, // red
        risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
     }
  };
  width = 500;
  height = 400;
  constructor(private breakpointObserver: BreakpointObserver) {}
}
