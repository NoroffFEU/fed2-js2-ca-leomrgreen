import { API_KEY } from "./constants";
import * as storage from "../utilities/storage";
const token = storage.load("token"); // retrieving the token from our localStorage

export function headers() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
