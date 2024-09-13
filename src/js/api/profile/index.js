import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class ProfileAPI {
  apiBase = "";
  apiProfile = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiProfile = `${apiBase}/social/profiles`;
  }

  profile = {
    read: async (username) => {
      try {
        const res = await fetch(`${this.apiProfile}/${username}`, {
          method: "GET",
          headers: headers(),
        });
        if (res.ok) {
          const data = await res.json();
          console.log("user received: ", data);
          return data;
        } else {
          alert("Could not find user");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    update: async (username, formData) => {
      const body = JSON.stringify(formData);
      try {
        const res = await fetch(`${this.apiProfile}/${username}`, {
          method: "PUT",
          headers: headers(),
          body,
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Updated user: ", data);
          return data;
        } else {
          alert("Failed to update profile, please try again");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
}
