import { Component, OnInit } from "@angular/core";
import { TheaterService } from "src/app/Services/theater.service";

@Component({
  selector: "app-admin-theater",
  templateUrl: "./admin-theater.component.html",
  styleUrls: ["./admin-theater.component.css"],
})
export class AdminTheaterComponent implements OnInit {
  constructor(private theaterService: TheaterService) {}
  theaters = [];
  name;

  ngOnInit() {
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      this.theaters = theaters;
      console.log(theaters);
    });
  }

  deleteTheater(id) {
    this.theaters = this.theaters.filter((theater) => theater.id != id);
    this.theaterService.deleteTheater(id).subscribe((v) => console.log(v));
  }

  addTheater() {
    this.theaterService.addTheater({ name: this.name }).subscribe((e) => {
      this.theaters.push(e);
    });
  }
}
