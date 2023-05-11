import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private count = new BehaviorSubject<number>(0);

  get count$() {
    return this.count.asObservable();
  }

  show() {
    this.count.next(this.count.value + 1);
  }

  hide() {
    this.count.next(this.count.value - 1);
  }
}
