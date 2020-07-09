import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService} from './_services';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  public currentUser = this.authenticationService.currentUserValue;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
.pipe(
  map(result => result.matches),
  shareReplay()
);

  title = 'report-app';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
