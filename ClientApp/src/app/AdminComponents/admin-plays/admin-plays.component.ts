import { Component, OnInit } from "@angular/core";
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
      this.plays = plays;
      console.log(plays);
    });
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      console.log(theaters);
      this.theaters = theaters;
    });
  }
  DeletePlay(id) {
    this.plays = this.plays.filter((play) => play.id != id);
    this.playService.deletePlay(id).subscribe();
  }
  AddPlay() {
    var selectedTheater = this.theaters.filter(
      (theater) => theater.id == this.theaterId
    )[0].name;

    var play = {
      name: this.name,
      theater: {
        name: selectedTheater,
      },
    };
    console.log(play);
    this.playService.addPlay(play).subscribe((returned) => {
      this.plays.push(returned);
    });
  }
}
