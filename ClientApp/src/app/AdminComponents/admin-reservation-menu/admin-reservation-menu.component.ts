import { Component, OnInit } from "@angular/core";
import { PlaysService } from "src/app/Services/play.service";

@Component({
  selector: "app-admin-reservation-menu",
  templateUrl: "./admin-reservation-menu.component.html",
  styleUrls: ["./admin-reservation-menu.component.css"],
})
export class AdminReservationMenuComponent implements OnInit {
  constructor(private myService: PlaysService) {}

  plays = [];
  ngOnInit() {
    this.myService.getPlays().subscribe((plays: any[]) => {
      this.plays = plays;
    });
  }
}
