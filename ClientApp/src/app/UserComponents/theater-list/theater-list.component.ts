import { Component, OnInit } from "@angular/core";
import { TheaterService } from "src/app/Services/theater.service";

@Component({
  selector: "app-theater-list",
  templateUrl: "./theater-list.component.html",
  styleUrls: ["./theater-list.component.css"],
})
export class TheaterListComponent implements OnInit {
  // Inject TheaterService
  constructor(private theaterService: TheaterService) {}
  theaters;
  ngOnInit() {
    // using TheaterService to get all theaters,
    // and assign the returned theaters to this.theater
    this.theaterService.getTheaters().subscribe((v) => (this.theaters = v));
  }
}
