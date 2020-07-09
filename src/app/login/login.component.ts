import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor(
    private _auth:AuthenticationService,
    private _toast:ToastrService,
    private _router:Router,
    private _route: ActivatedRoute) {
      // redirect to home if already logged in
      if (this._auth.currentUserValue) {
        this._router.navigateByUrl('dashboard');
    }
    }

  ngOnInit(): void {
  }

  loginUser(e:Event){
    //submit for that has 2 fields username,password
    e.preventDefault();
    console.log(e);
    const username = e.target[0].value;
    const password = e.target[1].value;

    this._auth.login(username,password)
      .pipe(first())
            .subscribe(
                data => {
                    this._router.navigateByUrl(this.returnUrl);
                },
                error => {
                    this._toast.error(error);
                });

  }
}
