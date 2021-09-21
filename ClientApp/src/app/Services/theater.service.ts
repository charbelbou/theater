import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TheaterService {
  constructor(private http: HttpClient) {}

  getTheaters() {
    return this.http.get("api/theaters");
  }

  deleteTheater(id) {
    return this.http.delete("api/theaters/" + id);
  }
  addTheater(name) {
    return this.http.post("api/theaters/", name);
  }
}
