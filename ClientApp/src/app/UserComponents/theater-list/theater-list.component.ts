import { Component, OnInit } from "@angular/core";
import { TheaterService } from "src/app/Services/theater.service";

@Component({
  selector: "app-theater-list",
  templateUrl: "./theater-list.component.html",
  styleUrls: ["./theater-list.component.css"],
})
export class TheaterListComponent implements OnInit {
  constructor(private theaterService: TheaterService) {}
  theaters;
  ngOnInit() {
    this.theaterService.getTheaters().subscribe((v) => (this.theaters = v));
  }
}
