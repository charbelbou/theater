import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlaysService } from "src/app/Services/play.service";

@Component({
  selector: "app-play-list",
  templateUrl: "./play-list.component.html",
  styleUrls: ["./play-list.component.css"],
})
export class PlayListComponent implements OnInit {
  constructor(private myService: PlaysService, private router: Router) {
    this.id = router.url.split("/")[2];
  }
  id;
  plays = [];
  ngOnInit() {
    this.myService.getPlaysByTheater(this.id).subscribe((plays: any[]) => {
      this.plays = plays;
    });
  }
}
