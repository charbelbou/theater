import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";

@Component({
  selector: "app-play-list",
  templateUrl: "./play-list.component.html",
  styleUrls: ["./play-list.component.css"],
})
export class PlayListComponent implements OnInit {
  // Inject PlaysService and Router
  constructor(private myService: PlaysService, private router: Router) {
    // Use router to parse url and get the theaterId
    this.theaterId = router.url.split("/")[2];
  }
  theaterId;
  plays = [];
  ngOnInit() {
    // Get all the plays in specific theater using theaterId
    this.myService
      .getPlaysByTheater(this.theaterId)
      .subscribe((plays: any[]) => {
        // Assign plays to this.plays
        this.plays = plays;
      });
  }
}
