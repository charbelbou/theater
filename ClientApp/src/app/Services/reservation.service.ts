import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ReservationService {
  constructor(private http: HttpClient) {}

  // Get all reservations belonging to play
  // Pass play Id
  getPlayReservations(id) {
    return this.http.get("api/reservations/" + id);
  }
  // Add reservation, pass reservation object
  addReservation(reservation) {
    return this.http.post("api/reservations", reservation);
  }
  // Update reservation, pass updated reservation object
  updateReservation(reservation) {
    return this.http.put("api/reservations", reservation);
  }
}
