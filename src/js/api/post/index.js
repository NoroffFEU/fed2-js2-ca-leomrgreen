import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class SocialAPI {
  apiBase = "";
  apiPost = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiPost = `${apiBase}/social/posts`;
  }

  post = {
    readAll: async () => {
      try {
        const res = await fetch(this.apiPost, {
          method: "GET",
          headers: headers(),
        });
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    readSinglePost: async (id) => {
      try {
        const res = await fetch(`${this.apiPost}/${id}`, {
          method: "GET",
          headers: headers(),
        });
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    create: async ({ title, body, tags, media }) => {
      console.log("Creating post with data:", { title, body, tags, media });
      const requestBody = JSON.stringify({ title, body, tags, media });
      console.log("Request body:", requestBody);

      try {
        const res = await fetch(this.apiPost, {
          method: "POST",
          headers: headers(),
          body: requestBody,
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Post creation successful. Response data:", data);
          return data;
        }
      } catch (error) {
        console.log("Error in post creation:", error.message);
        throw error;
      }
    },
  };
}
