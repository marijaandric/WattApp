import { Component, OnInit, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit,OnChanges{
  @Input() subTitle : String ="Get a discount!";
  @Input() Title : String ="Show us all your device, get a 10% discount! For more information, contact our operators! Dear consumers, we inform you that the price of electricity will decrease by 5% in the coming period.";
  @Input() Datum : String ="01.01.2023.";
  @Input() Status : String ="Nista";
  @Input() ID : number =0;

  

  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dsonewsService: DsonewsService,
    private toast: NgToastService,
    ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("USLO")
    this.subTitle = this.subTitle;
    this.Title = this.Title;
    this.Datum = this.Datum;
    this.Status = this.Status;
    this.ID = this.ID
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }

  DeleteNews(newsId: number) {
    this.dsonewsService.deleteNews(newsId).subscribe(() => {
      this.toast.success({detail:"SUCCESS",summary:"You have successfully DELETE news",duration:5000});
      setTimeout(() => {
        location.reload();
      }, 1500);

    },
    error => console.error(error)
    );
  }

  ngOnInit(): void {
    console.log(this.isBlue);
    console.log(this.isBgBlue);
  }

}
