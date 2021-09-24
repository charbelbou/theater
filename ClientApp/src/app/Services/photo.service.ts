import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PhotoService {
  constructor(private http: HttpClient) {}

  // Upload photo using photo file and play id
  upload(playId, photo) {
    var formData = new FormData();
    formData.append("file", photo);
    return this.http.post(`/api/photos/${playId}`, formData);
  }
}
