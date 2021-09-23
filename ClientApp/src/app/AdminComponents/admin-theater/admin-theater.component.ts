import { Component, OnInit } from "@angular/core";
import { TheaterService } from "src/app/Services/theater.service";

@Component({
  selector: "app-admin-theater",
  templateUrl: "./admin-theater.component.html",
  styleUrls: ["./admin-theater.component.css"],
})
export class AdminTheaterComponent implements OnInit {
  // TheaterService is injected
  constructor(private theaterService: TheaterService) {}

  // Array of theaters
  theaters = [];
  // Inputed theater name to be added
  name;

  ngOnInit() {
    // Use TheaterService to get all existing theaters
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      // Assign theaters to this.theaters
      this.theaters = theaters;
    });
  }

  // Triggered when delete button is pressed
  deleteTheater(id) {
    if (confirm("Are you sure you want to delete this theater?")) {
      // Use TheaterService to delete theater using Id
      this.theaterService.deleteTheater(id).subscribe(
        // On success, filter out the deleted theater
        (v) => {
          console.log(v);
          this.theaters = this.theaters.filter((theater) => theater.id != id);
        },
        // On error, display error message using alert
        (e) => {
          alert(e.error);
        }
      );
    }
  }

  // Adding theater,
  // triggered when add button is clicked
  addTheater() {
    if (confirm("Are you sure you want to add this theater?")) {
      // Add theater using TheaterService, pass Object with this.name assigned to name
      this.theaterService.addTheater({ name: this.name }).subscribe((e) => {
        // Push the returned object to this.theaters
        this.theaters.push(e);
        this.name = "";
      });
    }
  }
}
