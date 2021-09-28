import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";

@Component({
  selector: "app-admin-reservation-menu",
  templateUrl: "./admin-reservation-menu.component.html",
  styleUrls: ["./admin-reservation-menu.component.css"],
})
export class AdminReservationMenuComponent implements OnInit {
  // PlaysService is injected
  constructor(private myService: PlaysService, private router: Router) {}

  plays = [];
  ngOnInit() {
    // Get all plays using PlaysService, and assign them to this.plays
    this.myService.getPlays().subscribe((plays: any[]) => {
      // Filter out the rejected reservations
      plays.forEach((play) => {
        play.reservations = play.reservations.filter(
          (reservation) => reservation.confirmed != "rejected"
        );
      });
      this.plays = plays;
    });
  }

  // Click a card, navigates to the detail page
  clickPlay(id) {
    this.router.navigate(["admin/reservations", id]);
  }

  // Clicking add, navigates to add play page
  clickAdd() {
    this.router.navigate(["admin/add"]);
  }

  // Calculates the places left in a play
  // Multiply rows by columns and subtract the amount of reservations
  calculatePlaces(play) {
    return play.columns * play.rows - play.reservations.length;
  }
}
