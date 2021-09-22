import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";
import { ReservationService } from "src/app/Services/reservation.service";

@Component({
  selector: "app-admin-reservations",
  templateUrl: "./admin-reservations.component.html",
  styleUrls: ["./admin-reservations.component.css"],
})
export class AdminReservationsComponent implements OnInit {
  constructor(
    private myReservationService: ReservationService,
    private myPlaysService: PlaysService,
    private router: Router
  ) {
    this.id = router.url.split("/")[3];
  }
  rows = ["A", "B", "C", "D"];
  columns = [1, 2, 3, 4, 5, 6, 7];

  id;
  reservations: any[];
  play;

  decision;
  SelectedSeat;

  ngOnInit() {
    this.myReservationService
      .getPlayReservations(this.id)
      .subscribe((reservations: any[]) => {
        console.log(reservations);
        this.reservations = reservations.filter(
          (reservation) => reservation.confirmed != "rejected"
        );
      });
    this.myPlaysService.getPlay(this.id).subscribe((play) => {
      this.play = play;
    });
  }

  triggerReservation(setPlace) {
    var Reservation = this.findReservation(setPlace);
    this.SelectedSeat =
      Reservation.confirmed == "unconfirmed" ? Reservation : null;
  }

  submitReservation() {
    var temp = this.SelectedSeat;
    temp.confirmed = this.decision;

    this.myReservationService
      .updateReservation(temp)
      .subscribe((returned: any) => {
        this.SelectedSeat = returned;
        this.SelectedSeat = null;

        if (returned.confirmed == "rejected") {
          this.reservations = this.reservations.filter(
            (reservation) => reservation.confirmed != "rejected"
          );
        }

        console.log(this.reservations);
      });
  }

  class(setPlace) {
    var Reservation = this.findReservation(setPlace);
    return Reservation ? Reservation.confirmed : null;
  }

  findReservation(place) {
    return this.reservations.find((reservation) => reservation.place == place);
  }
}
