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
  // Inject PlaysService, Router, and ReservationServices
  constructor(
    private myPlaysService: PlaysService,
    private router: Router,
    private myReservationService: ReservationService
  ) {
    // Parse the url using router, and assign the play id to this.id
    this.id = router.url.split("/")[4];
  }
  MY_ID = 2;

  // Play id
  id;
  // Play object
  play;
  // All reservations
  reservations: any[];

  // Used to render the rows and columns, and assign each one a unique "Place" attribute (eg. A3, B5..)
  rows = ["A", "B", "C", "D"];
  columns = [1, 2, 3, 4, 5, 6, 7];
  ngOnInit() {
    // Use PlaysService to get play using this.id, and assign the play to this.play
    this.myPlaysService.getPlay(this.id).subscribe((play) => {
      this.play = play;
      console.log(play);
    });
    // Use ReservationService to get all reservations for a specific play with this.id
    this.myReservationService
      .getPlayReservations(this.id)
      .subscribe((reservations: any[]) => {
        // Assign the reservations to this.reservations
        // However, we need to filter out reservations which are
        // rejected and don't belong to this user
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

  // Determines which class the html seat tag belongs to (determines the coloring of the box)
  class(setPlace) {
    // Get the reservation for the seat (if it exists)
    var findReservation = this.findReservation(setPlace);

    if (findReservation) {
      // If the reservation exists,
      // Check if it belongs to another user, if it does, return "otheruser" (grey)
      // If it doesn't, return the confirmed status
      return findReservation.userId != this.MY_ID
        ? "otheruser"
        : findReservation.confirmed;
    }
    // If reservation doesn't exist, return null (white seat)
    else {
      return null;
    }
  }
  // Finds the reservation based on the place (A2,B3) that is passed
  findReservation(place) {
    return this.reservations.find((reservation) => reservation.place == place);
  }
}
