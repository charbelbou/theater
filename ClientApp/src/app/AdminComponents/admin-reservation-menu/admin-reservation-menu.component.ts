import { Component, OnInit } from "@angular/core";
import { PlaysService } from "src/app/Services/play.service";

@Component({
  selector: "app-admin-reservation-menu",
  templateUrl: "./admin-reservation-menu.component.html",
  styleUrls: ["./admin-reservation-menu.component.css"],
})
export class AdminReservationMenuComponent implements OnInit {
  // PlaysService is inected
  constructor(private myService: PlaysService) {}

  plays = [];
  ngOnInit() {
    // Get all plays using PlaysService, and assign them to this.plays
    this.myService.getPlays().subscribe((plays: any[]) => {
      this.plays = plays;
    });
  }
}
