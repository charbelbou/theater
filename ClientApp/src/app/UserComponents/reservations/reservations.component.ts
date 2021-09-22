import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";
import { ReservationService } from "src/app/Services/reservation.service";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.component.html",
  styleUrls: ["./reservations.component.css"],
})
export class ReservationsComponent implements OnInit {
  constructor(
    private myPlaysService: PlaysService,
    private router: Router,
    private myReservationService: ReservationService
  ) {
    this.id = router.url.split("/")[4];
  }
  MY_ID = 2;

  id;
  play;
  reservations: any[];

  rows = ["A", "B", "C", "D"];
  columns = [1, 2, 3, 4, 5, 6, 7];
  ngOnInit() {
    this.myPlaysService.getPlay(this.id).subscribe((play) => {
      this.play = play;
      console.log(play);
    });
    this.myReservationService
      .getPlayReservations(this.id)
      .subscribe((reservations: any[]) => {
        this.reservations = reservations.filter(
          (reservation) =>
            reservation.confirmed != "rejected" ||
            reservation.userId == this.MY_ID
        );
      });
  }

  reservePlace(place) {
    var findReservation = this.findReservation(place);
    var newReservation = {
      PlayId: this.play.id,
      UserId: this.MY_ID,
      Confirmed: "unconfirmed",
      Place: place,
    };
    console.log(newReservation);
    if (!findReservation) {
      this.myReservationService
        .addReservation(newReservation)
        .subscribe((reservation) => {
          this.reservations.push(reservation);
        });
    }
  }

  class(setPlace) {
    var findReservation = this.findReservation(setPlace);

    if (findReservation) {
      return findReservation.userId != this.MY_ID
        ? "otheruser"
        : findReservation.confirmed;
    } else {
      return null;
    }
  }

  findReservation(place) {
    return this.reservations.find((reservation) => reservation.place == place);
  }
}
