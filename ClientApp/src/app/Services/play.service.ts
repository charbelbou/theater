import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PlaysService {
  constructor(private http: HttpClient) {}

  // Get all plays belonging to a theater
  // Pass theater Id
  getPlaysByTheater(id) {
    return this.http.get("api/plays/" + id);
  }

  // Get all plays
  getPlays() {
    return this.http.get("api/plays");
  }

  // Delete play, pass the play Id
  deletePlay(id) {
    return this.http.delete("api/plays/" + id);
  }

  // Add play, pass play Object
  addPlay(play) {
    return this.http.post("api/plays", play);
  }

  // Get play, pass play Id
  getPlay(id) {
    return this.http.get("api/plays/play/" + id);
  }
}
