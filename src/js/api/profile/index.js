import { API_BASE } from "../constants";
import { headers } from "../headers";
import { hideLoader, showLoader } from "../../utilities/loader";

export default class ProfileAPI {
  apiBase = "";
  apiProfile = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiProfile = `${apiBase}/social/profiles`;
  }

  // Generic method to handle API requests
  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      showLoader();
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        alert(
          `Failed to ${method === "GET" ? "fetch" : "update"}, please try again`
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      hideLoader();
    }
  };

  profile = {
    read: async (username) => {
      const endpoint = `${this.apiProfile}/${username}?_following=true&_followers=true`;
      const data = await this.fetchData(endpoint);
      console.log("User received: ", data);
      return data;
    },

    update: async (username, formData) => {
      const endpoint = `${this.apiProfile}/${username}`;
      const data = await this.fetchData(endpoint, "PUT", formData);
      console.log("Updated user: ", data);
      return data;
    },

    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts`;
      const data = await this.fetchData(endpoint);
      console.log("Profile posts received: ", data);
      return data;
    },
    // Follow a user
    follow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/follow`;
      const data = await this.fetchData(endpoint, "PUT");
      console.log(`Started following ${username}: `, data);
      return data;
    },

    // Unfollow a user
    unfollow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/unfollow`;
      const data = await this.fetchData(endpoint, "PUT");
      console.log(`Stopped following ${username}: `, data);
      return data;
    },
  };
}
