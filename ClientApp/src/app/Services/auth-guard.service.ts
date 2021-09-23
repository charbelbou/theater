import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CustomAuthGuard implements CanActivate {
  constructor(private myAuth: AuthService) {}

  canActivate() {
    // Check if token exists
    var token = localStorage.getItem("token");
    if (token) {
      // If it does, allow access
      return true;
    }

    // If it doesn't, then redirect to login
    // redirect_uri to return to this route once user is logged in
    this.myAuth.loginWithRedirect({
      redirect_uri: "https://localhost:5001/authenticate",
    });
    return false;
  }
}
