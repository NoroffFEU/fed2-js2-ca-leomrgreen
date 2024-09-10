import NoroffAPI from "../../api/auth";

const api = new NoroffAPI();

export async function onRegister(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await api.auth.register(user);
    console.log("Registration successful:", response);

    e.target.reset();

    alert(`Registration successful for ${user.name}`);
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
