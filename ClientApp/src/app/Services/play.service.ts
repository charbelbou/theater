import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PlaysService {
  constructor(private http: HttpClient) {}

  getPlaysByTheater(id) {
    return this.http.get("api/plays/" + id);
  }

  getPlays() {
    return this.http.get("api/plays");
  }
  deletePlay(id) {
    return this.http.delete("api/plays/" + id);
  }
  addPlay(play) {
    return this.http.post("api/plays", play);
  }
  getPlay(id) {
    return this.http.get("api/plays/play/" + id);
  }
}
