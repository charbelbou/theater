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
  // Inject ReservationService, PlaysService and Router
  constructor(
    private myReservationService: ReservationService,
    private myPlaysService: PlaysService,
    private router: Router
  ) {
    // Assign the Play's Id, which is parsed from the Url path
    this.id = router.url.split("/")[3];
  }

  // Used to render the rows and columns, and assign each one a unique "Place" attribute (eg. A3, B5..)
  rows = ["A", "B", "C", "D"];
  columns = [1, 2, 3, 4, 5, 6, 7];

  // Play Id
  id;

  // All reservations
  reservations: any[];
  // Play object
  play;

  // Decision (Confirm or reject)
  decision;
  // Reservation object, depending on which seat we click on
  SelectedSeat;

  ngOnInit() {
    // Use ReservationService to get all reservations for specific play (using id)
    this.myReservationService
      .getPlayReservations(this.id)
      .subscribe((reservations: any[]) => {
        // Assign the returned reservations to this.reservations
        // However, we filter to get rid of all rejected reservations
        this.reservations = reservations.filter(
          (reservation) => reservation.confirmed != "rejected"
        );
      });

    // Get play using PlaysService, pass id which was parsed from url path
    this.myPlaysService.getPlay(this.id).subscribe((play) => {
      // assign play to this.play
      this.play = play;
    });
  }

  // Triggered when a seat is clicked
  // Passes seat (A2,B3..)
  triggerReservation(seat) {
    // Check if reservation exists for this seat
    var Reservation = this.findReservation(seat);

    // If reservation doesn't exist, or it does exist but is confirmed, then assign null to SelectedSeat
    // However, if Reservation exists and is unconfirmed (pending), then assign it to the SelectedSeat
    this.SelectedSeat =
      !Reservation || Reservation.confirmed != "unconfirmed"
        ? null
        : Reservation;
  }

  // Triggered when reservation decision is submitted
  submitReservation() {
    // Clone the selected seat and update it's "confirmed" status with the decision
    var newReservation = this.SelectedSeat;
    newReservation.confirmed = this.decision;

    // Use ReservationService to update reservation, and pass newReservation
    this.myReservationService
      .updateReservation(newReservation)
      .subscribe((returned: any) => {
        // Update the SelectedSeat, which updates it in the array of reservations
        this.SelectedSeat = returned;
        // Then assign it to null
        this.SelectedSeat = null;

        // If the decision was rejected, then filter it out
        if (returned.confirmed == "rejected") {
          this.reservations = this.reservations.filter(
            (reservation) => reservation.confirmed != "rejected"
          );
        }
      });
  }

  // Determines which class the html seat tag belongs to (determines the coloring of the box)
  class(seat) {
    // Get the reservation for the seat (if it exists)
    var Reservation = this.findReservation(seat);

    // If the reservation exists, then return it's "confirmed" status, which determines the color
    // 'confirmed' renders green square, 'unconfirmed' renders orange square
    // However if the reservation doesn't exist, then return null (Leaves the seat white)
    return Reservation ? Reservation.confirmed : null;
  }

  // Finds the reservation based on the place (A2,B3) that is passed
  findReservation(place) {
    return this.reservations.find((reservation) => reservation.place == place);
  }
}
