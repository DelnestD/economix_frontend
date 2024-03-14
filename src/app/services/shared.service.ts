import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isRegisteredSource = new BehaviorSubject<boolean>(false);
  isRegistered = this.isRegisteredSource.asObservable();

  constructor() {}

  changeRegisterStatus(status: boolean) {
    this.isRegisteredSource.next(status);
  }
}
