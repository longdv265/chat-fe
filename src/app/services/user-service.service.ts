import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage?.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(dataInput: object) {
    return this.http.post<any>(`${environment.appUrl}/login`, dataInput).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  callPusher(input: object) {
    return this.http.post(`${environment.appUrl}/messages`, input);
  }
}