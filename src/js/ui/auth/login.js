import NoroffAPI from "../../api";

const api = new NoroffAPI();

export async function onLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  try {
    const response = await api.auth.login(user);
    console.log("Login successful:", response);

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    alert(`Login successful for ${response.data.name}`);
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert(error);
  }
}
