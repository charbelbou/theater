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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "theaters", component: TheaterListComponent, pathMatch: "full" },
      { path: "theaters/:id", component: PlayListComponent, pathMatch: "full" },
      {
        path: "theaters/:id/plays/:play",
        component: ReservationsComponent,
        pathMatch: "full",
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
    ]),
  ],
  providers: [TheaterService, PlaysService, ReservationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
