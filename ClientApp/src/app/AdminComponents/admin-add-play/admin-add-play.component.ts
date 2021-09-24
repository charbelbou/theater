import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";
import { TheaterService } from "src/app/Services/theater.service";
import { Location } from "@angular/common";
import { PhotoService } from "src/app/Services/photo.service";

@Component({
  selector: "app-admin-add-play",
  templateUrl: "./admin-add-play.component.html",
  styleUrls: ["./admin-add-play.component.css"],
})
export class AdminAddPlayComponent implements OnInit {
  constructor(
    private theaterService: TheaterService,
    private playService: PlaysService,
    private location: Location,
    private photoService: PhotoService
  ) {}

  @ViewChild("fileInput") fileInput: ElementRef;

  // Id of the theater which is selected
  theaterId;

  // Numbers to be assigned to the select tags for rows and columns
  numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  // Array of all theaters
  theaters = [];

  // Play object which is binded to the form
  // To be submitted once submit button is clicked
  play = {
    name: "",
    theater: null,
    rows: 1,
    columns: 1,
    description: "",
  };

  ngOnInit(): void {
    // Get all theaters and assign to this.theaters
    this.theaterService.getTheaters().subscribe((theaters: any[]) => {
      this.theaters = theaters;
    });
  }

  // Triggered when add button is clicked
  AddPlay() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    // Assign the theater to the play, using the selected ID
    this.play.theater = this.theaters.find(
      (theater) => theater.id == this.theaterId
    );
    if (confirm("Are you sure you want to add this play?")) {
      // Create play object using this.play object
      // Add the play object using PlaysService
      this.playService.addPlay(this.play).subscribe((returned: any) => {
        console.log(returned);
        // Once play is added, navigate back to last page
        this.photoService.upload(returned.id, file).subscribe((object) => {
          this.location.back();
        });
      });
    }
  }
}
