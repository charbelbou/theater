import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-admin-card",
  templateUrl: "./admin-card.component.html",
  styleUrls: ["./admin-card.component.css"],
})
export class AdminCardComponent implements OnInit {
  // Play that gets passed to component
  @Input() passedPlay;
  // EventEmitter to navigate to new page
  @Output() clickEvent = new EventEmitter();

  constructor() {}

  // Gets triggered when the div is clicked, emits the event
  eventNavigate() {
    this.clickEvent.emit(null);
  }

  ngOnInit(): void {}

  // Calculates the places left in a play
  // Multiply rows by columns and subtract the amount of reservations
  calculatePlaces(play) {
    return play.columns * play.rows - play.reservations.length;
  }
}
