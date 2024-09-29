import { API_BASE } from "../constants";
import { headers } from "../headers";
import * as storage from "../../utilities/storage";

export default class NoroffAPI {
  apiBase = "";
  apiLogin = "";
  apiRegister = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiLogin = `${apiBase}/auth/login`;
    this.apiRegister = `${apiBase}/auth/register`;
  }

  // authentication methods : register, login
  auth = {
    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
      console.log("Body:", body); // keep for now

      try {
        const res = await fetch(this.apiRegister, {
          method: "POST",
          headers: headers(),
          body,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to register, please try again."
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error during registration:", error);
        throw error;
      }
    },

    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
      console.log("Body:", body); // keep for now
      try {
        const res = await fetch(this.apiLogin, {
          method: "POST",
          headers: headers(),
          body,
        });
        const data = await res.json();
        if (res.ok) {
          storage.save("token", data.data.accessToken);
          storage.save("user", data.data);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  };
}
