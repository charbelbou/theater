import { Component, OnInit } from "@angular/core";
import { Alert } from "selenium-webdriver";
import { PlaysService } from "src/app/Services/play.service";
import { TheaterService } from "src/app/Services/theater.service";

@Component({
  selector: "app-admin-plays",
  templateUrl: "./admin-plays.component.html",
  styleUrls: ["./admin-plays.component.css"],
})
export class AdminPlaysComponent implements OnInit {
  // Inject PlayService and TheaterService
  constructor(
    private playService: PlaysService,
    private theaterService: TheaterService
  ) {}

  // Name is binded to name of play being added, using text input
  // TheaterId is binded to the Id of the theater, to which the new play belongs to
  name;
  theaterId;

  theaters: any[] = [];
  plays = [];

  ngOnInit() {
    // Get all plays using PlaysService and assign them to this.plays
    this.playService.getPlays().subscribe((plays: any[]) => {
      console.log(plays);
      this.plays = plays;
    });

    // Get all theaters using TheaterService and assign them to this.theaters
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      this.theaters = theaters;
    });
  }

  // Triggered when delete button is clicked,
  // passes the id of the play being deleted
  DeletePlay(id) {
    if (confirm("Are you sure you want to delete this play?")) {
      // Find the play being deleted from the list of plays (this.plays)
      var myPlay = this.plays.find((play) => play.id == id);

      // Check if myPlay has any reservations that are confirmed
      var ConfirmedReservation = myPlay.reservations.find(
        (reservation) => reservation.confirmed == "confirmed"
      );

      // If a confirmed reservation does exist, trigger an alert box
      // Can't delete plays which have confirmed reservations
      if (ConfirmedReservation) {
        alert("Can't delete plays which have confirmed reservations");
      }
      // If a confirmed reservation doesn't exist,
      // then use PlaysService to delete the play
      else {
        this.playService.deletePlay(id).subscribe((response) => {
          // Filter out the delete play using it's Id
          this.plays = this.plays.filter((play) => play.id != id);
        });
      }
    }
  }

  // Triggered when add button is clicked
  AddPlay() {
    if (confirm("Are you sure you want to add this play?")) {
      // Create play object using:
      // - this.name
      // - find theater object where theater.id == this.theaterId
      var play = {
        name: this.name,
        theater: this.theaters.find((theater) => theater.id == this.theaterId),
      };

      // Add the play object using PlaysService
      this.playService.addPlay(play).subscribe((returned) => {
        // Push the returned object into the array of plays.
        this.plays.push(returned);
        this.name = "";
      });
    }
  }
}
