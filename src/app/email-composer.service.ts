import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailComposerService {
  // authUrl= "https://aneesh.herokuapp.com";
  authUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  sendEmail(email):Observable<any>{
    console.log(email)
    return this.http.get<boolean|any>(`${this.authUrl}/${email}`)
    .pipe(
        // map(loggedIn => {
        //     this.isAuthenticated = loggedIn;
        //     this.userAuthChanged(loggedIn);
        //     return loggedIn;
        // }),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Server error');
}
}
