import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/DSO/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';
import { StadardTemplateComponent } from './components/global/layout-components/standard-template/stadard-template.component';
import { LandingPageFooterComponent } from './components/global/landing-page-componenets/landing-page-footer/landing-page-footer.component';
import { LandingPageTeamComponent } from './components/global/landing-page-componenets/landing-page-team/landing-page-team.component';
import { TitleBarComponent } from './components/global/layout-components/title-bar/title-bar.component';
import { SidebarComponent } from './components/global/layout-components/side-bar/sidebar.component';
import { CenterBarComponent } from './components/global/layout-components/center-bar/center-bar.component';
import { InfoBarComponent } from './components/global/layout-components/info-bar/info-bar.component';
import { SelectOneMenuBarComponent } from './components/global/layout-components/select-one-menu-bar/select-one-menu-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { WidgetComponent } from './components/global/layout-components/widget/widget.component';
import { ProsumerhomeComponent } from './components/Prosumer/home-page-components/prosumerhome/prosumerhome.component';
import { PromotionComponent } from './components/Prosumer/home-page-components/promotion/promotion.component';
import { UserProfileComponent } from './components/global/user-profile/user-profile/user-profile.component';
import { UserProfileComponentComponent } from './components/global/user-profile/user-profile-component/user-profile-component.component';
import { UserCardComponent } from './components/global/user-profile/user-card/user-card.component';
import { OverlayModule } from 'primeng/overlay';
import { DialogModule } from 'primeng/dialog';
import { ContactComponent } from './components/global/contact/contact.component';
import { PieChartComponent } from './components/global/pie-chart/pie-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonutChartComponent } from './components/global/donut-chart/donut-chart.component';
import { TabMenuComponent } from './components/Prosumer/tab-menu/tab-menu.component';
import { DeviceComponent } from './components/global/device-page-components/device/device.component';
import { CarouselModule } from 'primeng/carousel';
import { DevicesComponent } from './components/Prosumer/devices-page-components/devices/devices.component';
import { DevicesConsumptionComponent } from './components/Prosumer/devices-page-components/devices-consumption/devices-consumption.component';
import { DevicesProductionComponent } from './components/Prosumer/devices-page-components/devices-production/devices-production.component';
import { DevicesStockComponent } from './components/Prosumer/devices-page-components/devices-stock/devices-stock.component';
import { BarChartComponent } from './components/global/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/global/line-chart/line-chart.component';
import { DeviceCardComponent } from './components/Prosumer/devices-page-components/device-card/device-card.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { WeatherForecastComponent } from './components/global/weather-forecast/weather-forecast.component';
import { StatisticComponent } from './components/Prosumer/statistic-page-components/statistic/statistic.component';
import { HistoryForecastComponent } from './components/global/history-forecast/history-forecast.component';
import { AreaBarChartComponent } from './components/global/home-page-components/area-bar-chart/area-bar-chart.component';
import { DeviceAreaBarChartComponent } from './components/global/device-page-components/device-area-bar-chart/device-area-bar-chart.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DevicesAllComponent } from './components/Prosumer/devices-page-components/devices-all/devices-all.component';
import { WeatherForecast7Component } from './components/global/weather-forecast7/weather-forecast7.component';
import { HistoryForecastTableComponent } from './components/global/history-forecast-table/history-forecast-table.component';
import { TabMenuDsoComponent } from './components/DSO/users-page-components/tab-menu-dso/tab-menu-dso.component';
import { TabMenuUsersComponent } from './components/DSO/users-page-components/tab-menu-users/tab-menu-users.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/DSO/map/map.component';
import { MarkerComponent } from './components/DSO/marker/marker.component';
import { MapSuburbComponent } from './components/DSO/map-suburb/map-suburb.component';
import { RegistrationMapComponent } from './components/DSO/registration-map/registration-map.component';
import { SingleAreaPieComponent } from './components/DSO/single-area-pie/single-area-pie.component';
import { AllAreasDonutComponent } from './components/DSO/all-areas-donut/all-areas-donut.component';
import { HistoryLineChartComponent } from './components/Prosumer/history-line-chart/history-line-chart.component';
import { ForecastLineChartComponent } from './components/Prosumer/forecast-line-chart/forecast-line-chart.component';
import { AreaChartComponent } from './components/global/area-chart/area-chart.component';
import { UsersProsumersComponent } from './components/DSO/users-page-components/users-prosumers/users-prosumers.component';
import { UsersOperatorsComponent } from './components/DSO/users-page-components/users-operators/users-operators.component';
import { CardComponent } from './components/DSO/user/card/card.component';
import { UserDSOComponent } from './components/DSO/user/user-dso/user-dso.component';
import { CircleComponent } from './components/DSO/user/circle/circle.component';
import { MapForAllUsersComponent } from './components/DSO/map-for-all-users/map-for-all-users.component';
import { TableComponent } from './components/DSO/user/table/table.component';
import { HomeDSOComponent } from './components/DSO/home-dso/home-dso.component';
import { PageNotFoundComponent } from './components/global/page-not-found/page-not-found.component';
import { MapUserDsoComponent } from './components/DSO/users-page-components/map-user-dso/map-user-dso.component';
import { MapForDsoUserComponent } from './components/DSO/map-for-dso-user/map-for-dso-user.component';
import { DeviceDesktopComponent } from './components/global/device-page-components/device-desktop/device-desktop.component';
import { DevicePhoneComponent } from './components/global/device-page-components/device-phone/device-phone.component';
import { FaqPageComponenetsComponent } from './components/global/faq-page-componenets/faq-page-componenets.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { GalleryComponent } from './components/global/landing-page-componenets/gallery/gallery.component';
import { StatsCardComponent } from './components/global/stats-card/stats-card.component';
import { SidebarNewComponent } from './components/global/layout-components/sidebar-new/sidebar-new.component';
import { ForgotPasswordComponent } from './components/global/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/global/reset-password/reset-password.component';
import { AboutUsComponent } from './components/global/about-us/about-us.component';
import { NewsComponent } from './components/global/news/news.component';
import { LoaderComponent } from './components/global/loader/loader.component';
import { HistoryOrForecastTableComponent } from './components/global/history-or-forecast-table/history-or-forecast-table.component';
import { LoaderService } from './services/loader/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { MapForUserProfileComponent } from './components/global/user-profile/map-for-user-profile/map-for-user-profile.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AdminPageComponent } from './components/DSO/admin-page/admin-page.component';
import { AdminCardComponent } from './components/DSO/admin-card/admin-card.component';
import { TagModule } from 'primeng/tag';
import { DatasComponent } from './components/Prosumer/data/data.component';
import { DatasTableComponent } from './components/Prosumer/datas-table/datas-table.component';
import { AdminMapComponent } from './components/DSO/admin-map/admin-map.component';
import { WhiteDeviceComponent } from './components/Prosumer/devices-page-components/white-device/white-device.component';
import { TimelineComponent } from './components/global/landing-page-componenets/timeline/timeline.component';

export const url = 'https://localhost:7158';
export const deviceFakerUrl = "https://localhost:7233";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LandingPageComponent,
    UsersComponent,
    HomeComponent,
    StadardTemplateComponent,
    LandingPageFooterComponent,
    LandingPageTeamComponent,
    TitleBarComponent,
    SidebarComponent,
    CenterBarComponent,
    InfoBarComponent,
    SelectOneMenuBarComponent,
    WidgetComponent,
    UserProfileComponent,
    UserProfileComponentComponent,
    UserCardComponent,
    ProsumerhomeComponent,
    PromotionComponent,
    ContactComponent,
    PieChartComponent,
    DonutChartComponent,
    TabMenuComponent,
    DeviceComponent,
    DevicesComponent,
    DevicesConsumptionComponent,
    DevicesProductionComponent,
    DevicesStockComponent,
    BarChartComponent,
    LineChartComponent,
    DeviceCardComponent,
    WeatherForecastComponent,
    StatisticComponent,
    HistoryForecastComponent,
    AreaBarChartComponent,
    DevicesAllComponent,
    WeatherForecast7Component,
    HistoryForecastTableComponent,
    TabMenuDsoComponent,
    TabMenuUsersComponent,
    DeviceAreaBarChartComponent,
    MapComponent,
    MarkerComponent,
    MapSuburbComponent,
    RegistrationMapComponent,
    SingleAreaPieComponent,
    AllAreasDonutComponent,
    HistoryLineChartComponent,
    ForecastLineChartComponent,
    AreaChartComponent,
    UsersProsumersComponent,
    UsersOperatorsComponent,
    CardComponent,
    UserDSOComponent,
    CircleComponent,
    MapForAllUsersComponent,
    TableComponent,
    HomeDSOComponent,
    PageNotFoundComponent,
    MapUserDsoComponent,
    MapForDsoUserComponent,
    DevicePhoneComponent,
    DeviceDesktopComponent,
    FaqPageComponenetsComponent,
    GalleryComponent,
    StatsCardComponent,
    SidebarNewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutUsComponent,
    NewsComponent,
    LoaderComponent,
    HistoryOrForecastTableComponent,
    MapForUserProfileComponent,
    AdminPageComponent,
    AdminCardComponent,
    DatasComponent,
    DatasTableComponent,
    AdminMapComponent,
    WhiteDeviceComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule,
    OverlayModule,
    DialogModule,
    CarouselModule,
    NgApexchartsModule,
    SelectButtonModule,
    ToggleButtonModule,
    InputSwitchModule,
    LeafletModule,
    FileUploadModule,
    ImageModule,
    OverlayPanelModule,
    TagModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['*'],
        disallowedRoutes: []
      }
    })

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true,
    
    },
    LoaderService,
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
