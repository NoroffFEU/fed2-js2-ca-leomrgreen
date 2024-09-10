import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class socialAPI {
  apiBase = "";
  apiReadPost = "";
  apiReadSinglePost = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiReadPost = `${apiBase}/social/posts`;
    this.apiReadSinglePost = `${apiBase}/social/posts`;
  }

  post = {
    readAll: async () => {
      try {
        const res = await fetch(this.apiReadPost, {
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
        const res = await fetch(`${this.apiReadSinglePost}/${id}`, {
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
  };
}
