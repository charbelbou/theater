import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ReservationService {
  constructor(private http: HttpClient) {}

  getPlayReservations(id) {
    return this.http.get("api/reservations/" + id);
  }
  addReservation(reservation) {
    return this.http.post("api/reservations", reservation);
  }
  updateReservation(reservation) {
    return this.http.put("api/reservations", reservation);
  }
}
