import { Component } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(public auth: AuthService) {}

  ngOnInit() {}

  user = JSON.parse(localStorage.getItem("user"));

  collapse() {
    this.isExpanded = false;
  }

  logout() {
    // On logout, empty out local storage
    this.auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
