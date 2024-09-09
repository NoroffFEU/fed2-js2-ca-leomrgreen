import NoroffAPI from "../../api/index";

const api = new NoroffAPI();

export async function onRegister(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await api.auth.register(user);
    console.log("Registration successful:", response);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    alert(`Registration successful for ${user.name}`);
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
