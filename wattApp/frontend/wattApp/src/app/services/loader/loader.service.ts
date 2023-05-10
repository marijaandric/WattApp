import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private count = new BehaviorSubject<boolean>(false);

  get count$() {
    return this.count.asObservable();
  }

  show() {
    this.count.next(true);
  }

  hide() {
    this.count.next(false);
  }
}
