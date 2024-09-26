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
    readAll: async () => {
      const endpoint = `${this.apiPost}/?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    readFollowPosts: async () => {
      const endpoint = `${this.apiPost}/following/?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    readSinglePost: async (id) => {
      const endpoint = `${this.apiPost}/${id}?_author=true&_comments=true&_reactions=true`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    readPostByUser: async (username) => {
      const endpoint = `${this.apiPost}/${username}`;
      const data = await this.fetchData(endpoint);
      return data;
    },

    create: async ({ title, body, tags, media }) => {
      const requestBody = { title, body, tags, media };
      const endpoint = `${this.apiPost}`;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      window.location.href = `/post/?id=${data.data.id}`;
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
      return data;
    },

    comment: async (id, body) => {
      const endpoint = `${this.apiPost}/${id}/comment`;
      const requestBody = body;
      const data = await this.fetchData(endpoint, "POST", requestBody);
      return data;
    },

    like: async (id, symbol) => {
      const endpoint = `${this.apiPost}/${id}/react/${symbol}`;
      const body = id;
      const data = await this.fetchData(endpoint, "PUT", body);
      window.location.reload();
      return data;
    },
  };
}
