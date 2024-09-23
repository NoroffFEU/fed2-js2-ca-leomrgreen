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

      // Check for 204 No Content
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
    readAll: async () => {
      const endpoint = this.apiPost;
      const data = await this.fetchData(endpoint);
      console.log("All posts:", data);
      return data;
    },

    readSinglePost: async (id) => {
      const endpoint = `${this.apiPost}/${id}?_author=true&_comments=true&_reactions=true`;
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
      const endpoint = `${this.apiPost}`;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      window.location.href = `/post/?id=${data.data.id}`;
      console.log(endpoint);
      return data;
    },

    delete: async (id) => {
      const endpoint = `${this.apiPost}/${id}`;
      const data = await this.fetchData(endpoint, "DELETE");
      return data;
    },

    update: async (id, { title, body, tags, media }) => {
      const requestBody = { title, body, tags, media };
      const endpoint = `${this.apiPost}/${id}`;
      const data = await this.fetchData(endpoint, "PUT", requestBody);
      console.log("Post updated");
      return data;
    },
  };
}
