import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class socialAPI {
  apiBase = "";
  apiReadPost = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiReadPost = `${apiBase}/social/posts`;
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
  };
}
