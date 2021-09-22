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
  constructor(
    private playService: PlaysService,
    private theaterService: TheaterService
  ) {}

  name;
  theaterId;

  theaters: any[] = [];
  plays = [];

  ngOnInit() {
    this.playService.getPlays().subscribe((plays: any[]) => {
      console.log(plays);
      this.plays = plays;
    });
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      this.theaters = theaters;
    });
  }
  DeletePlay(id) {
    var myPlay = this.plays.find((play) => play.id == id);
    var temp: any[] = [];
    if (
      myPlay.reservations.find(
        (reservation) => reservation.confirmed == "confirmed"
      )
    ) {
      alert("Can't delete plays which has confirmed reservations");
    } else {
      this.playService.deletePlay(id).subscribe((response) => {
        this.plays = this.plays.filter((play) => play.id != id);
      });
    }
  }
  AddPlay() {
    var play = {
      name: this.name,
      theater: this.theaters.filter(
        (theater) => theater.id == this.theaterId
      )[0],
    };
    this.playService.addPlay(play).subscribe((returned) => {
      console.log(returned);
      this.plays.push(returned);
    });
  }
}
