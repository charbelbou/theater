import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TheaterService {
  constructor(private http: HttpClient) {}

  // Get all Theaters
  getTheaters() {
    return this.http.get("api/theaters");
  }

  // Delete theater, pass theater Id
  deleteTheater(id) {
    return this.http.delete("api/theaters/" + id);
  }

  // Add theater, pass theater object
  addTheater(theater) {
    return this.http.post("api/theaters/", theater);
  }
}
