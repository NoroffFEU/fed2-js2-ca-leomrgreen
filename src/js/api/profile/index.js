import { API_BASE } from "../constants";
import { headers } from "../headers";
import { hideLoader, showLoader } from "../../utilities/loader";

/*
 * Class representing the API for propfile-retalted actions
 */

export default class ProfileAPI {
  apiBase = "";
  apiProfile = "";

  /**
   * Creates an instance of ProfileAPI.
   * @param {string} [apiBase=API_BASE] - The base URL for the API.
   */

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiProfile = `${apiBase}/social/profiles`;
  }

  /**
   * Generic method to handle API requests.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [method="GET"] - The HTTP method for the request (GET, POST, PUT, DELETE).
   * @param {Object} [body=null] - The request body for POST/PUT requests.
   * @returns {Promise<Object>} - The JSON response from the API.
   * @throws Will throw an error if the request fails.
   */

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
    // returns data from a specific user based on its id (username)
    read: async (username) => {
      const endpoint = `${this.apiProfile}/${username}?_following=true&_followers=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // function that allows a logged in user to update its data / profile features
    update: async (username, formData) => {
      const endpoint = `${this.apiProfile}/${username}`;
      const data = await this.fetchData(endpoint, "PUT", formData);
      return data;
    },

    // returns all posts by a user based on the ID / (username) given
    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // allows a user to follow another user
    follow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/follow`;
      const data = await this.fetchData(endpoint, "PUT");
      return data;
    },

    // allows a user to follow another user
    unfollow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/unfollow`;
      const data = await this.fetchData(endpoint, "PUT");
      return data;
    },

    // returns user data based on the search query
    search: async (query) => {
      const endpoint = `${this.apiProfile}/search?q=${query}`;
      const data = await this.fetchData(endpoint);
      return data;
    },
  };
}
