import { API_KEY } from "./constants";
import * as storage from "../utilities/storage";
const token = storage.load("token"); // retrieving the token from our localStorage

export function headers() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  // appends the API_KEY from "constants"
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  // when a user logs in, append the stored token in our header requests
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
