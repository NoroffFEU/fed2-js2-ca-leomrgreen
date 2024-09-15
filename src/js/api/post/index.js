import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class SocialAPI {
  apiBase = "";
  apiPost = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiPost = `${apiBase}/social/posts`;
  }

  // Generic method to handle API requests
  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
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
    readAll: async () => {
      const endpoint = this.apiPost;
      const data = await this.fetchData(endpoint);
      console.log("All posts:", data);
      return data;
    },

    readSinglePost: async (id) => {
      const endpoint = `${this.apiPost}/${id}`;
      const data = await this.fetchData(endpoint);
      console.log("Single post:", data);
      return data;
    },

    readPostByUser: async (username) => {
      const endpoint = `${this.apiPost}/${username}`;
      const data = await this.fetchData(endpoint);
      console.log("User posts:", data);
      return data;
    },

    create: async ({ title, body, tags, media }) => {
      const requestBody = { title, body, tags, media };
      console.log("Creating post with data:", requestBody);
      const endpoint = this.apiPost;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      console.log("Post creation successful. Response data:", data);
      return data;
    },
  };
}
