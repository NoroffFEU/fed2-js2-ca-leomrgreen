import { API_BASE } from "../constants";
import { headers } from "../headers";

/**
 * Class representing the API for social post-related actions.
 */

export default class SocialAPI {
  apiBase = "";
  apiPost = "";

  /**
   * Creates an instance of SocialAPI.
   * @param {string} [apiBase=API_BASE] - The base URL for the API.
   */

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiPost = `${apiBase}/social/posts`;
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
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });

      // Check for 204 No Content to make sure we don't get an error when deleting a post
      if (res.ok) {
        if (res.status === 204) {
          return; // No content to return
        }
        const data = await res.json();
        return data;
      } else {
        alert(
          `Failed to ${
            method === "GET" ? "fetch" : "create/update"
          }, please try again`
        );
      }
    } catch (error) {
      console.error("Error in API request:", error);
      throw error;
    }
  };

  post = {
    // reads all posts data from users, returns an array of all posts
    readAll: async () => {
      const endpoint = `${this.apiPost}/?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // reads all posts data from the profiles / users that the current user is following, returns an array of all posts
    readFollowPosts: async () => {
      const endpoint = `${this.apiPost}/following/?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // returns a post object based on what (id) we pass in as our parameter
    readSinglePost: async (id) => {
      const endpoint = `${this.apiPost}/${id}?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // reads all posts by (username), returns an array of objects (posts)
    readPostByUser: async (username) => {
      const endpoint = `${this.apiPost}/${username}`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    // passing in an object of {title, body, tags, media}, all strings. Returns an object (post)
    create: async ({ title, body, tags, media }) => {
      const requestBody = { title, body, tags, media };
      const endpoint = `${this.apiPost}`;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      window.location.href = `/post/?id=${data.data.id}`;
      return data;
    },

    // deletes a post based on the (id) provided as param. Returns an empty 204 on success.
    delete: async (id) => {
      const endpoint = `${this.apiPost}/${id}`;
      const data = await this.fetchData(endpoint, "DELETE");
      return data;
    },

    // updates a post based on the targeted (id) in the params and returns a new updated post
    // based on {title, body, tags, media}
    update: async (id, { title, body, tags, media }) => {
      const requestBody = { title, body, tags, media };
      const endpoint = `${this.apiPost}/${id}`;
      const data = await this.fetchData(endpoint, "PUT", requestBody);
      return data;
    },

    // post a comment by targeting the post id and comment it with our {body}, returns an {object}
    comment: async (id, body) => {
      const endpoint = `${this.apiPost}/${id}/comment`;
      const requestBody = body;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      return data;
    },

    // Endpoint is suppose to react to a post (id) with a symbol, but modified to only give a certain
    // emoji (see card.js file under /utils). If like method is used once again on the same post id, the reaction given will
    // be removed
    like: async (id, symbol) => {
      const endpoint = `${this.apiPost}/${id}/react/${symbol}`;
      const body = id;
      const data = await this.fetchData(endpoint, "PUT", body);
      window.location.reload();
      return data;
    },
  };
}
