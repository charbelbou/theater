import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MyAuth {
  constructor(private http: HttpClient) {}

  // Create user, pass user object
  createUser(user) {
    return this.http.post("api/users", user);
  }
}
