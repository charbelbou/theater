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
  user;

  // Play id
  id;
  // Play object
  play;
  // All reservations
  reservations: any[];

  // Seats that have been selected to be reserved
  selectedSeats: any[] = [];

  // Used to render the rows and columns, and assign each one a unique "Place" attribute (eg. A3, B5..)
  rows = ["A", "B", "C", "D"];
  columns = [1, 2, 3, 4, 5, 6, 7];
  ngOnInit() {
    // Use PlaysService to get play using this.id, and assign the play to this.play
    this.myPlaysService.getPlay(this.id).subscribe((play) => {
      this.play = play;
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
            reservation.userId == this.user.id
        );
      });
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  // Triggered when a seat is clicked
  reservePlace(place) {
    // Checks if reservation for this seat exists
    var findReservation = this.findReservation(place);
    if (!findReservation) {
      // If there is no reservation, then check if the seat has already been selected
      // for reservation (check if it exists in selectedSeats)
      var selectedSeat = this.selectedSeats.find((seat) => seat.place == place);

      if (selectedSeat) {
        // If it has been selected, then filter it out from the
        // array of selectedSeats
        this.selectedSeats = this.selectedSeats.filter(
          (seat) => seat.place != place
        );
      } else {
        // If it hasn't been selected, then push it to
        // the array of selectedSeats
        this.selectedSeats.push({
          playId: this.play.id,
          userId: this.user.id,
          user: this.user,
          confirmed: "unconfirmed",
          place: place,
        });
      }
    }
  }

  // Triggered when reserve button has been clicked
  ReserveSeats() {
    // Use ReservationService to add reservation for the selected seats
    this.myReservationService
      .addReservation(this.selectedSeats)
      .subscribe((reservation) => {
        // Add the new reservations to the existing list of reservatiosn
        this.reservations = this.reservations.concat(reservation);
        // Empty out the selected seats
        this.selectedSeats = [];
      });
  }

  // Determines which class the html seat tag belongs to (determines the coloring of the box)
  class(setPlace) {
    // Get the reservation for the seat (if it exists)
    var findReservation = this.findReservation(setPlace);

    if (findReservation) {
      // If the reservation exists,
      // Check if it belongs to another user, if it does, return "otheruser" (grey)
      // If it doesn't, return the confirmed status
      return findReservation.userId != this.user.id
        ? "otheruser"
        : findReservation.confirmed;
    }
    // If reservation doesn't exist, return null (white seat)
    else {
      var findInSelected = this.findSeatInSelected(setPlace);
      return findInSelected ? "selected" : null;
    }
  }
  // Finds the reservation based on the place (A2,B3) that is passed
  findReservation(place) {
    return this.reservations.find((reservation) => reservation.place == place);
  }
  findSeatInSelected(place) {
    return this.selectedSeats.find((seat) => seat.place == place);
  }
}
