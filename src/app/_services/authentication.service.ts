import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<Object>;
  public currentUser: Observable<Object>;

  constructor(private http:HttpClient) {
    this.currentUserSubject =
      new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('currentUserToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Object {
    return this.currentUserSubject.value;
}

  login(username:string, password:string) {
    console.log(`${environment.loginUrl}`);
    console.log({ username:username, password:password });
    return this.http.post<any>(`${environment.loginUrl}`, { username:username, password:password }, {
      headers : new HttpHeaders({
        "Access-Control-Allow-Headers":"*",
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      })
    })
        .pipe(map(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUserToken',JSON.stringify(data));
            this.currentUserSubject.next(data);
            console.log(data);
            return data;
        }));
}

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUserToken');
        this.currentUserSubject.next(null);
    }
}
