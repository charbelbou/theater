import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./UserComponents/home/home.component";
import { TheaterListComponent } from "./UserComponents/theater-list/theater-list.component";
import { AdminComponent } from "./AdminComponents/admin/admin.component";
import { AdminTheaterComponent } from "./AdminComponents/admin-theater/admin-theater.component";
import { AdminReservationsComponent } from "./AdminComponents/admin-reservations/admin-reservations.component";
import { TheaterService } from "./Services/theater.service";
import { PlayListComponent } from "./UserComponents/play-list/play-list.component";
import { PlaysService } from "./Services/play.service";
import { AdminPlaysComponent } from "./admincomponents/admin-plays/admin-plays.component";
import { ReservationsComponent } from "./usercomponents/reservations/reservations.component";
import { ReservationService } from "./Services/reservation.service";
import { AdminReservationMenuComponent } from "./admincomponents/admin-reservation-menu/admin-reservation-menu.component";
import { AuthGuard, AuthModule, AuthService } from "@auth0/auth0-angular";
import { MyAuth } from "./Services/auth.service";
import { CustomAuthGuard } from "./Services/auth-guard.service";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AdminAddPlayComponent } from "./admincomponents/admin-add-play/admin-add-play.component";
import { AdminCardComponent } from './admincomponents/admin-card/admin-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TheaterListComponent,
    AdminComponent,
    AdminTheaterComponent,
    AdminReservationsComponent,
    PlayListComponent,
    AdminPlaysComponent,
    ReservationsComponent,
    AdminReservationMenuComponent,
    AdminAddPlayComponent,
    AdminCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: "dev-r8lrb84i.us.auth0.com",
      clientId: "EpWSCv9oTlxm0xpTDgtdwLGCXImyoZ0L",
    }),
    RouterModule.forRoot([
      {
        path: "authenticate",
        component: AuthenticationComponent,
        pathMatch: "full",
      },
      // Apply CustomAuthGuard to prevent non-signed in users from accessing the pages
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
        canActivate: [CustomAuthGuard],
      },
      {
        path: "theaters",
        component: TheaterListComponent,
        pathMatch: "full",
        canActivate: [CustomAuthGuard],
      },
      {
        path: "theaters/:id",
        component: PlayListComponent,
        pathMatch: "full",
        canActivate: [CustomAuthGuard],
      },
      {
        path: "theaters/:id/plays/:play",
        component: ReservationsComponent,
        pathMatch: "full",
        canActivate: [CustomAuthGuard],
      },

      { path: "admin", component: AdminComponent, pathMatch: "full" },
      {
        path: "admin/theaters",
        component: AdminTheaterComponent,
        pathMatch: "full",
      },

      {
        path: "admin/plays",
        component: AdminPlaysComponent,
        pathMatch: "full",
      },
      {
        path: "admin/reservations",
        component: AdminReservationMenuComponent,
        pathMatch: "full",
      },
      {
        path: "admin/reservations/:id",
        component: AdminReservationsComponent,
        pathMatch: "full",
      },
      {
        path: "admin/add",
        component: AdminAddPlayComponent,
        pathMatch: "full",
      },
    ]),
  ],
  providers: [
    TheaterService,
    PlaysService,
    ReservationService,
    AuthService,
    MyAuth,
    CustomAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
