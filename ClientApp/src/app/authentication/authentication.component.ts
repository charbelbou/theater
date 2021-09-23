import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { MyAuth } from "../Services/auth.service";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private myAuth: MyAuth,
    private Router: Router
  ) {
    // Once user is logged in using Auth0, create an according user using MyAuth,
    // Which creates a user object on the database
    // Once user is created, store the object in local storage
    this.auth.user$.subscribe((user) => {
      this.myAuth.createUser({ email: user.email }).subscribe((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
      });
    });
    // Once user is logged in, we need to store the token in local storage
    // And also check whether the user is an admin or not
    this.auth.idTokenClaims$.subscribe((token) => {
      if (token) {
        console.log(token);
        localStorage.setItem("token", token.__raw);
        // If user is an admin, navigate to /admin
        if (token["https://courses.com/roles"]) {
          if (token["https://courses.com/roles"].indexOf("Admin") > -1) {
            Router.navigateByUrl("/admin");
          }
        }
        // Else, navigate to the / route
        else {
          Router.navigateByUrl("");
        }
      }
    });

    //    Router.navigateByUrl("/admin");

    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("token"));
  }

  ngOnInit(): void {}
}
